import moment from 'moment';
import {
  __,
  add,
  and,
  anyPass,
  compose,
  eqBy,
  filter,
  find,
  identity,
  includes,
  multiply,
  pluck,
  prop,
  propEq,
  propOr,
  reduce,
  unionWith,
} from 'ramda';

/**
 * Apply discount to got cost
 *
 * @param {number} cost
 * @param {number} discount
 * @returns {number|undefined}
 */
const applyDiscount = (cost, discount) => Math.round(cost * (1 - (discount / 100)));

/**
 * Login if a date in order is same that was get one
 *
 * @param {string} date
 * @param {Object} order
 * @returns {boolean}
 */
const isSameDay = (date, order) => (
  !date || (prop('discounts', order) && moment(date).isSame(order.dateTour, 'day'))
);

/** Make function that pluck prop `id` form array items and filter undefined and null */
const pluckIdsAndFilterVoid = compose(
  filter(identity),
  pluck('id'),
);

/** Make function that union arrays by unique id prop */
const unionById = unionWith(eqBy(prop('id')));

/**
 * Make function that check if a prop `id` is in an array
 *
 * @param {Array} ids
 * @return {function}
 */
const containsIds = ids => compose(
  includes(__, ids),
  prop('id'),
);

/**
 * Get united services with prices to calculate cost
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {Array}  params.services
 * @param {Array}  params.selected
 * @returns {Array}
 */
const getAppliedAdditionalServices = params => {
  const {
    order,
    additionalServices,
    selectedAdditionalServices,
  } = params;

  const servicesFromOrder = prop('additionalServices', order);
  const unitedServices = unionById(servicesFromOrder, additionalServices);
  const ids = pluckIdsAndFilterVoid(selectedAdditionalServices || order.additionalServices || []);
  const isServiceSelected = containsIds(ids);

  return filter(isServiceSelected, unitedServices);
};

/**
 * Extract promotion discount from order
 *
 * @param {Object} order
 * @param {Object} params.discounts
 * @return {number}
 */
const extractPromotionDiscount = compose(
  propOr(0, 'value'),
  find(propEq('type', 'promotion')),
  propOr([], 'discounts'),
);

/**
 * Extract prepayment discount from order
 *
 * @param {Object} order
 * @param {Object} params.discounts
 * @return {number}
 */
const extractPrepaymentDiscount = compose(
  propOr(0, 'value'),
  find(propEq('type', 'prepayment')),
  propOr([], 'discounts'),
);


/**
 * Extract promo code discount from order
 *
 * @param {Object} order
 * @param {Object} order.discounts
 * @return {number}
 */
const extractPromoCodeDiscount = compose(
  propOr(0, 'value'),
  find(anyPass([propEq('type', 'promo_code_one'), propEq('type', 'promo_code_many')])),
  propOr([], 'discounts'),
);

/**
 * Login if date is early enough
 *
 * @param dateTour
 * @param calculations
 * @return {boolean}
 */
export const isDateEarlyEnough = (dateTour, calculations) => {
  const { earlyDiscountDayCount } = calculations;
  const lastDiscountDay = moment().add(earlyDiscountDayCount, 'day');
  return moment(dateTour).isAfter(lastDiscountDay, 'day');
};

/**
 * Login if promotion is active
 *
 * @param {Object} discount
 * @param {Object} discount.orderStartAt
 * @param {Object} discount.orderExpiresAt
 * @param {Object} discount.value
 * @param {string} date
 * @return {boolean}
 */
const isPromotionActive = (discount, date) => Boolean(
  moment(date).isBetween(
    prop('orderStartsAt', discount),
    prop('orderExpiresAt', discount),
    'day',
    '[]',
  ),
);

/**
 * Get cost of additional services
 *
 * @param {Array} services
 */
const calcAdditionalServicesCost = services => reduce(
  (accumulator, service) => add(accumulator, propOr(0, 'price', service)),
  0,
  services,
);


/**
 * Get actual scooter count
 *
 * @param {Object} order
 * @param {number} count
 * @return {number}
 */
const getActualScooterCount = (order, count) => count || propOr(0, 'scootersCount', order);

/**
 * Get actual scooter price
 *
 * @param {Object} order
 * @param {Object} calculations
 * @param {number} count
 * @return {number}
 */
const getActualScooterPrice = (order, calculations, count) => (
  and(order, count > prop('scootersCount', order))
    ? prop('scooterPrice', calculations)
    : propOr(prop('scooterPrice', calculations), 'scooterPrice', order)
);

/**
 * Get initial cost, before applying discounts
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {number} params.scootersCount
 * @param {Object} params.calculations
 * @param {number} params.calculations.scooterPrice
 * @param {number} params.calculations.discountPrepayment
 * @param {number} params.calculations.discountPromotion
 * @param {string} params.dateTour
 * @return {number}
 */
const getInitialCost = params => {
  const {
    order,
    scootersCount,
    calculations,
  } = params;

  const actualScooterPrice = getActualScooterPrice(order, calculations, scootersCount);
  const actualScootersCount = getActualScooterCount(order, scootersCount);

  return multiply(actualScooterPrice, actualScootersCount);
};

/**
 * Get initial cost, before applying discounts
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {Object} params.calculations
 * @param {string} params.dateTour
 * @return {Object}
 */
const getPromotionDiscount = params => {
  const {
    order,
    calculations,
    promoCodeDiscount,
    dateTour,
    ...rest
  } = params;

  const { discountPromotion } = calculations;

  if (isSameDay(dateTour, order)) {
    const appliedPromotionDiscount = extractPromotionDiscount(order);
    return {
      ...rest,
      order,
      calculations,
      dateTour,
      appliedPromotionDiscount,
    };
  }

  if (prop('value', discountPromotion) < promoCodeDiscount) {
    return {
      ...rest,
      order,
      calculations,
      promoCodeDiscount,
      dateTour,
      appliedPromotionDiscount: 0,
    };
  }

  const isPromotion = isPromotionActive(discountPromotion, dateTour);
  const appliedPromotionDiscount = isPromotion ? prop('value', discountPromotion) : 0;

  return {
    ...rest,
    order,
    calculations,
    promoCodeDiscount,
    dateTour,
    appliedPromotionDiscount,
  };
};

/**
 * Get value of applied promotion discount and discount cost
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {number} params.scootersCount
 * @param {Object} params.calculations
 * @param {string} params.dateTour
 * @return {Object}
 */
const getPromotionCost = params => {
  const {
    appliedPromotionDiscount,
    promoCodeDiscount,
    order,
    ...rest
  } = params;

  const initialCost = getInitialCost(params);

  const appliedPromoCodeDiscount = order
    ? extractPromoCodeDiscount(order)
    : promoCodeDiscount || 0;

  if (appliedPromotionDiscount >= appliedPromoCodeDiscount) {
    const promotionCost = applyDiscount(initialCost, appliedPromotionDiscount);
    return {
      ...rest,
      initialCost,
      appliedPromotionDiscount,
      promotionCost,
      appliedPromoCodeDiscount: 0,
      order,
    };
  }

  return {
    ...rest,
    initialCost,
    appliedPromotionDiscount: 0,
    promotionCost: initialCost,
    appliedPromoCodeDiscount,
    order,
  };
};

/**
 * Get value of applied promotional code discount and discount cost
 *
 * @param {Object} params
 * @param {number} params.promotionCost
 * @param {number} params.promoCodeDiscount
 * @return {Object}
 */
const getPromoCodeCost = params => {
  const {
    promotionCost,
    promoCodeDiscount,
    appliedPromoCodeDiscount,
    ...rest
  } = params;

  if (appliedPromoCodeDiscount === 0) {
    return {
      ...rest,
      promotionCost,
      appliedPromoCodeDiscount,
      promoCodeCost: promotionCost,
    };
  }

  const promoCodeCost = applyDiscount(promotionCost, appliedPromoCodeDiscount);
  return {
    ...rest,
    promotionCost,
    appliedPromoCodeDiscount,
    promoCodeCost,
  };
};

/**
 * Get value of prepayment discount and discount cost
 *
 * @param {Object} params
 * @param {number} params.promoCodeCost
 * @param {number} params.discountPrepayment
 * @param {string} params.bookingType
 * @return {Object}
 */
const getPrepaymentCost = params => {
  const {
    promoCodeCost,
    bookingType,
    calculations,
    dateTour,
    order,
    ...rest
  } = params;

  if (isSameDay(dateTour, order)) {
    const appliedPrepaymentDiscount = extractPrepaymentDiscount(order);
    const prepaymentCost = applyDiscount(promoCodeCost, appliedPrepaymentDiscount);

    return {
      ...rest,
      order,
      promoCodeCost,
      appliedPrepaymentDiscount,
      prepaymentCost,
      calculations,
    };
  }

  const { discountPrepayment } = calculations;
  const isDateEarly = isDateEarlyEnough(dateTour, calculations);
  const appliedPrepaymentDiscount = discountPrepayment && isDateEarly && bookingType === 'full'
    ? discountPrepayment
    : 0;
  const prepaymentCost = applyDiscount(promoCodeCost, appliedPrepaymentDiscount);

  return {
    ...rest,
    order,
    promoCodeCost,
    appliedPrepaymentDiscount,
    prepaymentCost,
    calculations,
  };
};

/**
 * Get value of prepayment discount and discount cost
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {number} params.prepaymentCost
 * @param {number} params.additionalServices
 * @param {string} params.selectedAdditionalServices
 * @return {Object}
 */
const getTotalCost = params => {
  const {
    prepaymentCost,
    ...rest
  } = params;

  const getAdditionalServicesCost = compose(
    calcAdditionalServicesCost,
    getAppliedAdditionalServices,
  );

  const additionalServicesCost = getAdditionalServicesCost(params);

  const totalCost = add(prepaymentCost, additionalServicesCost);

  return {
    ...rest,
    prepaymentCost,
    additionalServicesCost,
    totalCost,
  };
};

/**
 * Get values of all discounts and discount costs with each of them
 *
 * @param {Object} params
 * @return {Array}
 */
const calculateCostAndDiscounts = params => {
  const calculate = compose(
    getTotalCost,
    getPrepaymentCost,
    getPromoCodeCost,
    getPromotionCost,
    getPromotionDiscount,
  );

  const {
    initialCost,
    appliedPromotionDiscount, promotionCost,
    appliedPromoCodeDiscount, promoCodeCost,
    appliedPrepaymentDiscount, prepaymentCost,
    additionalServicesCost,
    totalCost,
  } = calculate(params);

  return [
    initialCost,
    appliedPromotionDiscount, promotionCost,
    appliedPromoCodeDiscount, promoCodeCost,
    appliedPrepaymentDiscount, prepaymentCost,
    additionalServicesCost,
    totalCost,
  ];
};

export default calculateCostAndDiscounts;

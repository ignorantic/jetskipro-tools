import { compose, find, prop, propEq, propOr } from 'ramda';
import moment from 'moment';
import isSameDay from './isSameDay';

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

export default getPromotionDiscount;

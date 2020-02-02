import getPromotionDiscount from './internal/getPromotionDiscount';
import getPromotionCost from './internal/getPromotionCost';
import getPromoCodeCost from './internal/getPromoCodeCost';
import getTotalCost from './internal/getTotalCost';
import getPrepaymentCost from './internal/getPrepaymentCost';
import getInitialCost from './internal/getInitialCost';

/**
 * Get values of all discounts and discount costs with each of them
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {Object} params.calculations
 * @param {string} params.dateTour
 * @param {number} params.scootersCount
 * @param {string} params.bookingType
 * @return {Array}
 */
const calculateCostAndDiscounts = params => {
  const {
    order,
    scootersCount,
    bookingType,
    calculations,
    promoCodeDiscount,
    dateTour,
    additionalServices,
    selectedAdditionalServices,
  } = params;

  const initialCost = getInitialCost({
    order,
    scootersCount,
    calculations,
  });

  const initialPromotionDiscount = getPromotionDiscount({
    order,
    calculations,
    promoCodeDiscount,
    dateTour,
  });

  const [appliedPromotionDiscount, promotionCost, appliedPromoCodeDiscount] = getPromotionCost({
    initialCost,
    initialPromotionDiscount,
    promoCodeDiscount,
    order,
  });

  const promoCodeCost = getPromoCodeCost({
    promotionCost,
    appliedPromoCodeDiscount,
  });

  const [appliedPrepaymentDiscount, prepaymentCost] = getPrepaymentCost({
    promoCodeCost,
    bookingType,
    calculations,
    dateTour,
    order,
  });

  const [additionalServicesCost, totalCost] = getTotalCost({
    order,
    additionalServices,
    selectedAdditionalServices,
    prepaymentCost,
  });

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

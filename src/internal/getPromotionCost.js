import applyDiscount from './applyDiscount';
import extractPromoCodeDiscount from './etractPromoCodeDiscount';

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
    initialCost,
    initialPromotionDiscount,
    promoCodeDiscount,
    order,
  } = params;

  const appliedPromoCodeDiscount = order
    ? extractPromoCodeDiscount(order)
    : promoCodeDiscount || 0;

  if (initialPromotionDiscount >= appliedPromoCodeDiscount) {
    const promotionCost = applyDiscount(initialCost, initialPromotionDiscount);
    return [initialPromotionDiscount, promotionCost, 0];
  }

  return [0, initialCost, appliedPromoCodeDiscount];
};

export default getPromotionCost;

import applyDiscount from './applyDiscount';

/**
 * Get value of applied promotional code discount and discount cost
 *
 * @param {Object} params
 * @param {number} params.promotionCost
 * @param {number} params.appliedPromoCodeDiscount
 * @return {number}
 */
const getPromoCodeCost = params => {
  const {
    promotionCost,
    appliedPromoCodeDiscount,
  } = params;

  if (appliedPromoCodeDiscount === 0) {
    return promotionCost;
  }

  return applyDiscount(promotionCost, appliedPromoCodeDiscount);
};

export default getPromoCodeCost;

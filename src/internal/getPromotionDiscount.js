import { prop } from 'ramda';
import isSameDay from './isSameDay';
import extractPromotionDiscount from './extractPromotionDiscount';
import isPromotionActive from './isPromotionActive';

/**
 * Get initial cost, before applying discounts
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {Object} params.calculations
 * @param {string} params.dateTour
 * @return {number}
 */
const getPromotionDiscount = (params) => {
  const {
    order,
    calculations,
    dateTour,
  } = params;

  const { discountPromotion } = calculations;

  if (isSameDay(dateTour, order)) {
    return extractPromotionDiscount(order);
  }

  const isPromotion = isPromotionActive(discountPromotion, dateTour);
  return isPromotion ? prop('value', discountPromotion) : 0;
};

export default getPromotionDiscount;

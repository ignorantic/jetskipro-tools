import { prop } from 'ramda';
import moment from 'moment';
import isSameDay from './isSameDay';
import extractPromotionDiscount from './extractPromotionDiscount';

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
  } = params;

  const { discountPromotion } = calculations;

  if (isSameDay(dateTour, order)) {
    return extractPromotionDiscount(order);
  }

  if (prop('value', discountPromotion) < promoCodeDiscount) {
    return 0;
  }

  const isPromotion = isPromotionActive(discountPromotion, dateTour);
  return isPromotion ? prop('value', discountPromotion) : 0;
};

export default getPromotionDiscount;

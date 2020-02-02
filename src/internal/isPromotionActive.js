import moment from 'moment';
import { prop } from 'ramda';

/**
 * Check if promotion is active
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

export default isPromotionActive;

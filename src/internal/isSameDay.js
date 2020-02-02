import { prop } from 'ramda';
import moment from 'moment';

/**
 * Check if a date in order is same that was get one
 *
 * @param {string} date
 * @param {Object} order
 * @returns {boolean}
 */
const isSameDay = (date, order) => (
  !date || (prop('discounts', order) && moment(date).isSame(order.dateTour, 'day'))
);

export default isSameDay;

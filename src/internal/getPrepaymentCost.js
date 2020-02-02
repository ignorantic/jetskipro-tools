import isSameDay from './isSameDay';
import applyDiscount from './applyDiscount';
import { isDateEarlyEnough } from './isDateEarlyEnough';
import { compose, find, propEq, propOr } from 'ramda';

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
 * Get value of prepayment discount and discount cost
 *
 * @param {Object} params
 * @param {number} params.promoCodeCost
 * @param {string} params.bookingType
 * @param {Object} params.calculations
 * @param {string} params.dateTour
 * @param {Object} params.order
 * @return {[number, number]}
 */
const getPrepaymentCost = params => {
  const {
    promoCodeCost,
    bookingType,
    calculations,
    dateTour,
    order,
  } = params;

  if (isSameDay(dateTour, order)) {
    const appliedPrepaymentDiscount = extractPrepaymentDiscount(order);
    const prepaymentCost = applyDiscount(promoCodeCost, appliedPrepaymentDiscount);

    return [appliedPrepaymentDiscount, prepaymentCost];
  }

  const { discountPrepayment } = calculations;
  const isDateEarly = isDateEarlyEnough(dateTour, calculations);
  const appliedPrepaymentDiscount = discountPrepayment && isDateEarly && bookingType === 'full'
    ? discountPrepayment
    : 0;
  const prepaymentCost = applyDiscount(promoCodeCost, appliedPrepaymentDiscount);

  return [appliedPrepaymentDiscount, prepaymentCost];
};

export default getPrepaymentCost;

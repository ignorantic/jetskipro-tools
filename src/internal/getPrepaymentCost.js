import applyDiscount from './applyDiscount';
import { isDateEarlyEnough } from '../isDateEarlyEnough';

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
const getPrepaymentCost = (params) => {
  const {
    promoCodeCost,
    bookingType,
    calculations,
    dateTour,
  } = params;

  const { discountPrepayment } = calculations;
  const isDateEarly = isDateEarlyEnough(dateTour, calculations);
  const appliedPrepaymentDiscount = discountPrepayment && isDateEarly && bookingType === 'full'
    ? discountPrepayment
    : 0;
  const prepaymentCost = applyDiscount(promoCodeCost, appliedPrepaymentDiscount);

  return [appliedPrepaymentDiscount, prepaymentCost];
};

export default getPrepaymentCost;

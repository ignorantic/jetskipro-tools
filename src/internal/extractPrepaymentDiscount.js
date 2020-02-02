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

export default extractPrepaymentDiscount;

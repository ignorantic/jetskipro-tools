import {
  compose, find, propEq, propOr,
} from 'ramda';

/**
 * Extract promotion discount from order
 *
 * @param {Object} order
 * @param {Object} params.discounts
 * @return {number}
 */
const extractPromotionDiscount = compose(
  propOr(0, 'value'),
  find(propEq('type', 'promotion')),
  propOr([], 'discounts'),
);

export default extractPromotionDiscount;

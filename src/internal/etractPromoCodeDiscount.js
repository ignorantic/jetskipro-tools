import {
  anyPass, compose, find, propEq, propOr,
} from 'ramda';

/**
 * Extract promo code discount from order
 *
 * @param {Object} order
 * @param {Object} order.discounts
 * @return {number}
 */
const extractPromoCodeDiscount = compose(
  propOr(0, 'value'),
  find(anyPass([propEq('type', 'promo_code_one'), propEq('type', 'promo_code_many')])),
  propOr([], 'discounts'),
);

export default extractPromoCodeDiscount;

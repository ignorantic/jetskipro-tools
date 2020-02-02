/**
 * Apply discount to got cost
 *
 * @param {number} cost
 * @param {number} discount
 * @returns {number}
 */
const applyDiscount = (cost, discount) => (
  Math.round(cost * (1 - (discount / 100)))
);

export default applyDiscount;

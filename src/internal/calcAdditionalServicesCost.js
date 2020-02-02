import { add, propOr, reduce } from 'ramda';

/**
 * Get cost of additional services
 *
 * @param {Array} services
 */
const calcAdditionalServicesCost = services => reduce(
  (accumulator, service) => add(accumulator, propOr(0, 'price', service)),
  0,
  services,
);

export default calcAdditionalServicesCost;

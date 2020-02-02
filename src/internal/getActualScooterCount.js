import { propOr } from 'ramda';

/**
 * Get actual scooter count
 *
 * @param {Object} order
 * @param {number} count
 * @return {number}
 */
const getActualScooterCount = (order, count) => (
  count || propOr(0, 'scootersCount', order)
);

export default getActualScooterCount;

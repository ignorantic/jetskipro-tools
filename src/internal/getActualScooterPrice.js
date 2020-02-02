import { and, prop, propOr } from 'ramda';

/**
 * Get actual scooter price
 *
 * @param {Object} order
 * @param {Object} calculations
 * @param {number} count
 * @return {number}
 */
const getActualScooterPrice = (order, calculations, count) => (
  and(order, count > prop('scootersCount', order))
    ? prop('scooterPrice', calculations)
    : propOr(prop('scooterPrice', calculations), 'scooterPrice', order)
);

export default getActualScooterPrice;

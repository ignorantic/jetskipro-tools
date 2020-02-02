import { multiply } from 'ramda';
import getActualScooterPrice from './getActualScooterPrice';
import getActualScooterCount from './getActualScooterCount';

/**
 * Get initial cost, before applying discounts
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {number} params.scootersCount
 * @param {Object} params.calculations
 * @return {number}
 */
const getInitialCost = params => {
  const {
    order,
    scootersCount,
    calculations,
  } = params;

  const actualScooterPrice = getActualScooterPrice(order, calculations, scootersCount);
  const actualScootersCount = getActualScooterCount(order, scootersCount);

  return multiply(actualScooterPrice, actualScootersCount);
};

export default getInitialCost;

import { add, compose } from 'ramda';
import getAppliedAdditionalServices from './getAppliedAdditionalServices';
import calcAdditionalServicesCost from './calcAdditionalServicesCost';

/**
 * Get value of prepayment discount and discount cost
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {number} params.prepaymentCost
 * @param {number} params.additionalServices
 * @param {string} params.selectedAdditionalServices
 * @return {[number, number]}
 */
const getTotalCost = (params) => {
  const {
    prepaymentCost,
  } = params;

  const getAdditionalServicesCost = compose(
    calcAdditionalServicesCost,
    getAppliedAdditionalServices,
  );

  const additionalServicesCost = getAdditionalServicesCost(params);

  const totalCost = add(prepaymentCost, additionalServicesCost);

  return [additionalServicesCost, totalCost];
};

export default getTotalCost;

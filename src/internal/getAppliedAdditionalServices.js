import {
  filter, is, not, prop,
} from 'ramda';
import pluckIdsAndFilterVoid from './pluckIdsAndFilterVoid';
import unionById from './unionById';
import containsIds from './containsIds';

/**
 * Get united services with prices to calculate cost
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {Array}  params.additionalServices
 * @param {Array}  params.selectedAdditionalServices
 * @returns {Array}
 */
const getAppliedAdditionalServices = (params) => {
  const {
    order,
    additionalServices,
    selectedAdditionalServices,
  } = params;

  const isBothArray = is(Array, additionalServices) && is(Array, selectedAdditionalServices);

  const orderAdditionalServices = prop('additionalServices', order);

  const hasAdditionalServices = is(Array, orderAdditionalServices);

  if (not(isBothArray) && not(hasAdditionalServices)) {
    return [];
  }

  const servicesFromOrder = prop('additionalServices', order);
  const unitedServices = unionById(servicesFromOrder, additionalServices);
  const ids = pluckIdsAndFilterVoid(selectedAdditionalServices || orderAdditionalServices);
  const isServiceSelected = containsIds(ids);

  return filter(isServiceSelected, unitedServices);
};

export default getAppliedAdditionalServices;

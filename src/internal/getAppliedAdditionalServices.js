import { filter, prop } from 'ramda';
import pluckIdsAndFilterVoid from './pluckIdsAndFilterVoid';
import unionById from './unionById';
import containsIds from './containsIds';

/**
 * Get united services with prices to calculate cost
 *
 * @param {Object} params
 * @param {Object} params.order
 * @param {Array}  params.services
 * @param {Array}  params.selected
 * @returns {Array}
 */
const getAppliedAdditionalServices = params => {
  const {
    order,
    additionalServices,
    selectedAdditionalServices,
  } = params;

  const servicesFromOrder = prop('additionalServices', order);
  const unitedServices = unionById(servicesFromOrder, additionalServices);
  const ids = pluckIdsAndFilterVoid(selectedAdditionalServices || order.additionalServices || []);
  const isServiceSelected = containsIds(ids);

  return filter(isServiceSelected, unitedServices);
};

export default getAppliedAdditionalServices;

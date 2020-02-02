import {
  __, compose, eqBy, filter, identity, includes, pluck, prop, unionWith,
} from 'ramda';

/** Make function that pluck prop `id` form array items and filter undefined and null */
const pluckIdsAndFilterVoid = compose(
  filter(identity),
  pluck('id'),
);

/** Make function that union arrays by unique id prop */
const unionById = unionWith(eqBy(prop('id')));

/**
 * Make function that check if a prop `id` is in an array
 *
 * @param {Array} ids
 * @return {function}
 */
const containsIds = ids => compose(
  includes(__, ids),
  prop('id'),
);

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

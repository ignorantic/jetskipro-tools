import {
  __, compose, includes, prop,
} from 'ramda';

/**
 * Make function that check if a prop `id` is in an array
 *
 * @param {Array} ids
 * @return {function}
 */
const containsIds = (ids) => compose(
  includes(__, ids),
  prop('id'),
);

export default containsIds;

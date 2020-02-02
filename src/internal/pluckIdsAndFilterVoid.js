import {
  compose, filter, identity, pluck,
} from 'ramda';

/** Make function that pluck prop `id` form array items and filter undefined and null */
const pluckIdsAndFilterVoid = compose(
  filter(identity),
  pluck('id'),
);

export default pluckIdsAndFilterVoid;

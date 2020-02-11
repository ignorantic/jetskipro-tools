import {
  always, ifElse, isEmpty, map,
} from 'ramda';
import fetchify from '../fetchify';

/** Function used to transform a fetched collection */
const fetchifyCollection = ifElse(
  isEmpty,
  always(undefined),
  map((data) => fetchify(data)),
);

export default fetchifyCollection;

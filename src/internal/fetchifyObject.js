import {
  compose, fromPairs, map, toPairs,
} from 'ramda';
import fetchify from '../fetchify';
import toCamel from '../toCamel';

/** Function used to transform a fetched object */
const fetchifyObject = compose(
  fromPairs,
  map(([key, value]) => [toCamel(key), fetchify(value)]),
  toPairs,
);

export default fetchifyObject;

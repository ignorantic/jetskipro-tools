import {
  cond, identity, is, T,
} from 'ramda';
import fetchifyCollection from './internal/fetchifyCollection';
import fetchifyObject from './internal/fetchifyObject';

/** Function used to transform a fetched data */
const fetchify = cond([
  [is(Array), fetchifyCollection],
  [is(Object), fetchifyObject],
  [T, identity],
]);

export default fetchify;

import {
  cond, identity, is, T,
} from 'ramda';
import sendifyCollection from './internal/sendifyCollection';
import sendifyObject from './internal/sendifyObject';

/** Function used to transform a send data */
const sendify = cond([
  [is(Array), sendifyCollection],
  [is(Object), sendifyObject],
  [T, identity],
]);

export default sendify;

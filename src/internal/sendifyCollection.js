import {
  always, ifElse, isEmpty, map,
} from 'ramda';
import sendify from '../sendify';

/** Function used to transform a collection to be sendify */
const sendifyCollection = ifElse(
  isEmpty,
  always(undefined),
  map((data) => sendify(data)),
);

export default sendifyCollection;

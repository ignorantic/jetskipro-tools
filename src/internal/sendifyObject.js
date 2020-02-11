import {
  compose, fromPairs, map, toPairs,
} from 'ramda';
import sendify from '../sendify';
import toSnake from '../toSnake';

/** Function used to transform a object to be send */
const sendifyObject = compose(
  fromPairs,
  map(([key, value]) => [toSnake(key), sendify(value)]),
  toPairs,
);

export default sendifyObject;

import { map } from 'ramda';
import sendify from '../sendify';

/**
 * Function used to transform a collection to be sendify
 *
 * @return [Array]
 * @param data
 */
const sendifyCollection = (data) => map(sendify, data);

export default sendifyCollection;

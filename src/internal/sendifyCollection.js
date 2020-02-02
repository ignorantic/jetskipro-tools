import { map } from 'ramda';
import sendify from '../sendify';

/**
 * Function used to transform a collection to be sendify
 *
 * @param {Array} data
 * @return {Array}
 */
const sendifyCollection = (data) => map(sendify, data);

export default sendifyCollection;

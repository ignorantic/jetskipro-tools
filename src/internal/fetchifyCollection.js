import { map } from 'ramda';
import fetchify from '../fetchify';

/**
 * Function used to transform a fetched collection
 *
 * @param {Array} data
 * @return {Array}
 */
const fetchifyCollection = (data) => map(fetchify, data);

export default fetchifyCollection;

import { map } from 'ramda';
import fetchify from '../fetchify';

/**
 * Function used to transform a fetched collection
 *
 * @return [Array]
 * @param data
 */
const fetchifyCollection = (data) => map(fetchify, data);

export default fetchifyCollection;

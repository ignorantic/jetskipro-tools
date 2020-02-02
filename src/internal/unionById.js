import { eqBy, prop, unionWith } from 'ramda';

/** Make function that union arrays by unique id prop */
const unionById = unionWith(eqBy(prop('id')));

export default unionById;

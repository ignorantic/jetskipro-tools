import { concat } from 'ramda';

const toSnake = (str) => str.replace(/([A-Z])/g, (x) => concat('_', x.toLowerCase()));

export default toSnake;

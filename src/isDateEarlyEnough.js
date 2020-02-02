import moment from 'moment';

/**
 * Login if date is early enough
 *
 * @param dateTour
 * @param calculations
 * @return {boolean}
 */
export const isDateEarlyEnough = (dateTour, calculations) => {
  const { earlyDiscountDayCount } = calculations;
  const lastDiscountDay = moment().add(earlyDiscountDayCount, 'day');
  return moment(dateTour).isAfter(lastDiscountDay, 'day');
};

export default isDateEarlyEnough;

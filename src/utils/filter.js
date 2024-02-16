import { isDateInFuture, isDateInPast } from '../utils/point';
import { FilterType } from '../view/const';

export const filter = {
  [ FilterType.EVERYTHING ]: (points) => points,
  [ FilterType.FUTURE ]: (points) => points.filter((item) => isDateInFuture(item.dateBegin) || isDateInPast(item.dateBegin) && isDateInFuture(item.dateEnd)),
  [ FilterType.PAST ]: (points) => points.filter((item) =>isDateInPast(item.dateBegin) || isDateInPast(item.dateBegin) && isDateInFuture(item.dateEnd)),
};

console.log('filters', filter);
//

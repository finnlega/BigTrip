// import { dataCopy } from '../main';
import { isDateInFuture, isDateInPast } from '../utils/point';

// const filterdates = (data) => {
//   const filteredData = data.filter((item) => isDateInFuture(item.dateBegin) || isDateInPast(item.dateBegin) && isDateInFuture(item.dateEnd));
//   filteredData.forEach((item) => console.log(item.dateBegin));
//   return filteredData.length;
// };

// Закоментируем моки для фильтров
const PointToFilterMap = {
  Everything : (data) => data.length,
  Future: (data) => data.filter((item) => isDateInFuture(item.dateBegin) || isDateInPast(item.dateBegin) && isDateInFuture(item.dateEnd)).length,
  Past : (data) => data.filter((item) => isDateInPast(item.dateBegin) || isDateInPast(item.dateBegin) && isDateInFuture(item.dateEnd)).length,
};

export const generateFilter = (points) => Object.entries(PointToFilterMap).map(([filterName, countPoints]) => ({
  name: filterName,
  count: countPoints(points),
}));

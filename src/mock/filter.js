// import { dataCopy } from '../main';
import { IsDateInFeature, IsDateInPast } from '../view/utils';

const PointToFilterMap = {
  Everything : (data) => data.length,
  Future: (data) => data.filter((item) => IsDateInFeature(item.dateBegin)).length,
  Past : (data) => data.filter((item) => IsDateInPast(item.dateBegin)).length,
};

export const generateFilter = (points) => Object.entries(PointToFilterMap).map(([filterName, countPoints]) => ({
  name: filterName,
  count: countPoints(points),
}));
//

import { FilterType, UpdateType } from '../view/const';
import { filter } from '../utils/filter';
import FilterView from '../view/filters';
import { render, RenderPosition, replace, remove } from '../utils/render';

export default class Filter {
  constructor(filterContainer, pointsModel, filterModel) {
    this._filterContainer = filterContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._filterCompanent = null;

    this._handleModeEvent = this._handleModeEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModeEvent);
    this._filterModel.addObserver(this._handleModeEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterCompanent = this._filterCompanent;
    this._filterCompanent = new FilterView(filters, this._filterModel.getFilter());
    this._filterCompanent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if(prevFilterCompanent === null){
      render(this._filterContainer, this._filterCompanent, RenderPosition.BEFOREEND);
      return;
    }
    replace(this._filterCompanent, prevFilterCompanent);
    remove(prevFilterCompanent);
  }

  _handleModeEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if(this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MINOR, filterType);
  }

  _getFilters() {
    const points = this._pointsModel.getPoints();

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
        count: filter[FilterType.EVERYTHING](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
        count: filter[FilterType.FUTURE](points).length,
      },
      {
        type: FilterType.PAST,
        name: 'Past',
        count: filter[FilterType.PAST](points).length,
      },
    ];
  }
}

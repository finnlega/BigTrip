const PointToFilterMap = {
  Everything : (tasks) => tasks.length,
  // Future : (tasks) => tasks
  //   .filter((task) => !task.isArchive)
  //   .filter((task) => isTaskExpired(task.dueDate)).length,
  // Past : (tasks) => tasks
  //   .filter((task) => !task.isArchive)
  //   .filter((task) => isTaskExpiringToday(task.dueDate)).length,
  // favorites: (tasks) => tasks
  //   .filter((task) => !task.isArchive)
  //   .filter((task) => task.isFavorite).length,
  // repeating: (tasks) => tasks
  //   .filter((task) => !task.isArchive)
  //   .filter((task) => isTaskRepeating(task.repeating)).length,
  // archive: (tasks) => tasks.filter((task) => task.isArchive).length,
};

const createFilterTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export { createFilterTemplate };

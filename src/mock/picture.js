import { getRandomInteger } from '../view/utils';
import { TRIP_DESCRIPTION } from '../view/const';

const COUNT_INITIAL = 0;
const COUNT_MIN = 1;
const COUNT_MAX = 5;

// const tripDescriptions = [
//   'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   'Cras aliquet varius magna, non porta ligula feugiat eget.',
//   'Fusce tristique felis at fermentum pharetra.',
//   'Aliquam id orci ut lectus varius viverra.',
//   'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
//   'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
//   'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
//   'Sed sed nisi sed augue convallis suscipit in sed felis.',
//   'Aliquam erat volutpat.',
//   'Nunc fermentum tortor ac porta dapibus.',
//   'In rutrum ac purus sit amet tempus.' ];

const pictures = {
  src: 'src',
  description: 'description',
};

export const getDescription = (array) => {
  const data = [];
  for (let i = 0; i < getRandomInteger(COUNT_MIN, COUNT_MAX); i++) {
    data.push(array[i]);
  }
  return data;
};

//Получит картинки с описанием

export const getPictures = () => {
  const data = [];
  for (let i = 0; i < getRandomInteger(COUNT_INITIAL, COUNT_MAX); i++) {
    data.push({

      // динамически не смог получить картинку, поэтому ставлю заглушку в виде статики

      [pictures.src] : 'https://fastly.picsum.photos/id/415/248/152.jpg?hmac=XAnvJhZoHP_PMT_-Dx-dpgi5ome0sgTQE90ueZs4Vj0',
      [pictures.description] : TRIP_DESCRIPTION[getRandomInteger(COUNT_INITIAL, TRIP_DESCRIPTION.length)],
    });
  }
  return data;
};

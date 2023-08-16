// const getRandomInteger = (a = 0, b = 1) => {
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));

//   return Math.floor(lower + Math.random() * (upper - lower + 1));
// };

const typePointTrip = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const destination = [ 'Amsterdam', 'Chamonix', 'Geneva' ];
// Дополнительные опции по типу маршрута

const offer = {
  offers: [
    {
      title: 'Choose meal',
      price: 180,
    },
    {
      title: 'Upgrade to comfort class',
      price: 50,
    },
  ],
  type: typePointTrip,
  id: 0,
};


// Описание маршрута

const destination = {
  description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
  nameTrip: 'Chamonix',
  pictures: [
    {
      src: 'http://picsum.photos/300/200?r=0.0762563005163317',
      description: 'Chamonix parliament building',
    },
  ],
  id: 1,
};

const generate = () => {
  return {
    price: 200,
    dateFrom: null,
    dateTo: null,
    destination: destination,
    isFavorite: false,
    offer: offer.offers,
    type: offer.type,
    idOffer: offer.id,
    idDestination: [1],
  };
};

export const result = generate();

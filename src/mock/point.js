const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateType = () => {

  const typePointTrip = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

  const randomIndex = getRandomInteger(0, typePointTrip.length - 1);

  return typePointTrip[randomIndex];
};

// const generateOffer = () => {

//   const titleOffer = ['Choose meal', 'Upgrade to comfort class', 'Book tickets', 'Lunch in city', 'Rent a car', 'Add luggage', 'Switch to comfort', 'Add breakfast' ];
//   // const priceOffer = getRandomInteger(1, 500);

//   // const randomIndex = getRandomInteger(0, titleOffer.length - 1);
//   for (let i = 0; i < getRandomInteger(0, titleOffer.length - 1); i++ ) {
//     return {
//       title: titleOffer[i],
//       price: getRandomInteger(1, 500),
//     };
//   }

// };

const destination = [ 'Amsterdam', 'Chamonix', 'Geneva' ];

// Дополнительные опции по типу маршрута

// const getOffers =  () => {
//   for (let i = 0; i < getRandomInteger(0, titleOffer.length - 1).length; i++ ) {

//   }
// }

const offer = [
  // {
  //   type: generateType(),
  //   offers: generateOffer(),
  // },
  {
    type: 'taxi',
    offers: [
      {
        title: 'Choose meal',
        price: 250,
      },
      {
        title: 'Upgrade to comfort class',
        price: 30,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        title: 'Choose meal',
        price: 200,
      },
      {
        title: 'Upgrade to comfort class',
        price: 60,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [
      {
        title: 'Book tickets',
        price: 40,
      },
      {
        title: 'Lunch in city',
        price: 30,
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        title: 'Rent a car',
        price: 200,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        title: 'Add luggage',
        price: 30,
      },
      {
        title: 'Switch to comfort',
        price: 100,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        title: 'Add breakfast',
        price: 50,
      },
    ],
  },
  {
    type: 'train',
    offers: [
    ],
  },
  {
    type: 'ship',
    offers: [
    ],
  },
  {
    type: 'transport',
    offers: [
    ],
  },
  {
    type: 'restaurant',
    offers: [
    ],
  },
];

console.log(offer);

const checkValueInObject = (obj, value) => {
  const key = 'type';
  if (key in obj){
    if (value === obj.type) {
      return obj;
    }
  }
};

const getObj = () => {
  const valueArray = generateType();
  const res = offer.filter((value) => checkValueInObject(value, valueArray));
  return res[0];
};

// Описание маршрута

// const destination = {
//   description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
//   nameTrip: 'Chamonix',
//   pictures: [
//     {
//       src: 'http://picsum.photos/300/200?r=0.0762563005163317',
//       description: 'Chamonix parliament building',
//     },
//   ],
//   id: 1,
// };

const generate = () => ({
  price: 200,
  dateFrom: null,
  dateTo: null,
  destination: destination,
  isFavorite: false,
  offer: getObj(),
  idOffer: null,
  idDestination: [1],
});

export { generate };

import { Image, Offer } from '../pages/offer-page/types/types';

export const galleryImages: Image[] = [
  'img/room.jpg',
  'img/apartment-01.jpg',
  'img/apartment-02.jpg',
  'img/apartment-03.jpg',
  'img/studio-01.jpg',
  'img/apartment-01.jpg'
];


const offers: Offer[] = [
  {
    id: '1',
    images: galleryImages,
    title: 'Beautiful & luxurious studio at great location',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    isPremium: true,
    rating: 4.8,
    price: 120,
    bedrooms: 3,
    amountAdults: 4,
    city: 'Amsterdam',
    host: {
      avatar: 'img/avatar-angelina.jpg',
      name: 'Angelina',
      isPro: true
    },
    reviews: [
      {
        avatar: 'img/avatar-max.jpg',
        username: 'Max',
        rating: 5,
        date: 'April 2024',
        text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.'
      }
    ],
    type: 'apartment',
    features: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cabel TV', 'Fridge']
  },
  {
    id: '2',
    images: galleryImages.slice(2, 6),
    title: 'Charming & cozy apartment in the heart of the city',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
    isPremium: false,
    rating: 2.8,
    price: 30,
    bedrooms: 1,
    amountAdults: 2,
    city: 'Amsterdam',
    host: {
      avatar: 'img/avatar-angelina.jpg',
      name: 'Albina',
      isPro: false
    },
    reviews: [
      {
        avatar: 'img/avatar-max.jpg',
        username: 'Riki',
        rating: 3,
        date: 'May 1999',
        text: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized'
      }
    ],
    type: 'room',
    features: ['Cabel TV', 'Fridge']
  },
  {
    id: '3',
    images: galleryImages.slice(3),
    title: 'Spacious & modern loft with breathtaking views',
    description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness',
    isPremium: true,
    rating: 5,
    price: 322,
    bedrooms: 5,
    amountAdults: 7,
    city: 'Amsterdam',
    host: {
      avatar: 'img/avatar-angelina.jpg',
      name: 'Kira',
      isPro: true
    },
    reviews: [
      {
        avatar: 'img/avatar-max.jpg',
        username: 'Vasya',
        rating: 1,
        date: 'January 2010',
        text: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore'
      }
    ],
    type: 'house',
    features: ['Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cabel TV', 'Fridge']
  },
  {
    id: '4',
    images: galleryImages.slice(1, 4),
    title: 'Elegant & bright flat just steps from the sea',
    description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga',
    isPremium: false,
    rating: 3.1,
    price: 199,
    bedrooms: 2,
    amountAdults: 3,
    city: 'Amsterdam',
    host: {
      avatar: 'img/avatar-angelina.jpg',
      name: 'Rosalinda',
      isPro: false
    },
    reviews: [
      {
        avatar: 'img/avatar-max.jpg',
        username: 'Mirabella',
        rating: 2,
        date: 'October 2000',
        text: ' Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur'
      }
    ],
    type: 'hotel',
    features: ['Wi-Fi', 'Washing machine', 'Towels', 'Kitchen', 'Dishwasher', 'Cabel TV', 'Fridge']
  }
];

export { offers };

import faker from 'faker';
import { Offer, OfferPreview, Review } from '../pages/offer-page/types/types';
import { UserData } from '../types/user';
import { CityName } from '../pages/main-page/const/const';

const CITIES: CityName[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

const APARTMENT_TYPES = ['apartment', 'house', 'room', 'hotel'] as const;

const GOODS = ['Wi-Fi', 'Kitchen', 'Heating', 'Fridge', 'Coffee machine'];

const pick = <T>(items: readonly T[]): T => faker.random.arrayElement([...items]);

const pickMany = <T>(items: readonly T[], count: number): T[] => {
  const copy = [...items];
  const result: T[] = [];
  for (let i = 0; i < count && copy.length > 0; i++) {
    const index = faker.datatype.number({ min: 0, max: copy.length - 1 });
    result.push(copy[index]);
    copy.splice(index, 1);
  }
  return result;
};

export const createMockOfferPreview = (
  overrides: Partial<OfferPreview> = {},
): OfferPreview => {
  const latitude = Number(faker.address.latitude());
  const longitude = Number(faker.address.longitude());

  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    type: pick(APARTMENT_TYPES),
    price: faker.datatype.number({ min: 100, max: 1000 }),
    city: {
      name: pick(CITIES),
      location: { latitude, longitude, zoom: 12 },
    },
    location: { latitude, longitude, zoom: 12 },
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
    previewImage: faker.image.imageUrl(),
    ...overrides,
  };
};

export const createMockOffer = (
  overrides: Partial<Offer> = {},
): Offer => ({
  ...createMockOfferPreview(),
  description: faker.lorem.paragraph(),
  bedrooms: faker.datatype.number({ min: 1, max: 5 }),
  goods: pickMany(GOODS, faker.datatype.number({ min: 1, max: GOODS.length })),
  host: {
    name: faker.name.findName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
  },
  images: Array.from({ length: 6 }, () => faker.image.imageUrl()),
  maxAdults: faker.datatype.number({ min: 1, max: 8 }),
  reviews: [],
  ...overrides,
});

export const createMockReview = (
  overrides: Partial<Review> = {},
): Review => ({
  id: faker.datatype.uuid(),
  date: faker.date.past().toISOString(),
  user: {
    name: faker.name.findName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
  },
  comment: faker.lorem.sentences(2),
  rating: faker.datatype.number({ min: 1, max: 5 }),
  ...overrides,
});

export const createMockUser = (
  overrides: Partial<UserData> = {},
): UserData => ({
  email: faker.internet.email(),
  token: faker.datatype.uuid(),
  name: faker.name.findName(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
  ...overrides,
});

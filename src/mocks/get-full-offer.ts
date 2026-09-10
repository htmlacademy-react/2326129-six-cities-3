import { Offer, OfferPreview } from '../pages/offer-page/types/types';
import { offers } from './offers';
import { reviews } from './reviews';

export const getFullOffer = (id: string): Offer | undefined => {
  const preview: OfferPreview | undefined = offers.find((offer) => offer.id === id);

  if (!preview) {
    return undefined;
  }

  return {
    ...preview,
    description: 'A cozy and modern place in the heart of the city.',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Heating', 'Towels', 'Coffee machine'],
    host: {
      name: 'John Doe',
      avatarUrl: '/img/avatar-angelina.jpg',
      isPro: true,
    },
    images: [preview.previewImage, preview.previewImage, preview.previewImage],
    maxAdults: 2,
    reviews,
  };
};

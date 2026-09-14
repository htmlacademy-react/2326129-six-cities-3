import { OfferPreview } from '../types/types';

const MAX_NEAR_OFFERS = 3;

export function getNearOffers(
  offers: OfferPreview[],
  currentOffer: OfferPreview
): OfferPreview[] {
  return offers
    .filter(
      (offer) =>
        offer.id !== currentOffer.id &&
        offer.city.name === currentOffer.city.name
    )
    .slice(0, MAX_NEAR_OFFERS);
}

import { SortingForm } from '../../../main-page/components/sorting-form/sorting-form';
import { useEffect, useState } from 'react';
import { Nullable } from 'vitest';
import { OfferPreview } from '../../types/types';
import { PlaceCard } from '../../../../components/place-card/place-card';

type OffersSectionProps = {
  offers: OfferPreview[];
}

function OffersSection({ offers }: OffersSectionProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Nullable<OfferPreview>>(null);
  const handleCardHover = (offer?: OfferPreview) => {
    setActiveOffer(offer || null);
  };
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('call useEffect');
  }, [activeOffer]);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {offers[0].city.name}</b>
      < SortingForm />
      <div className="cities__places-list places__list tabs__content">
        {offers && offers.length > 0 && offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            variant='cities'
            onMouseEnter={() => handleCardHover(offer)}
            onMouseLeave={() => handleCardHover()}
          />
        ))}
      </div>
    </section>
  );
}

export { OffersSection };

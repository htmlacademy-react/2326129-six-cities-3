import { Offer } from '../../types/types';
import { SortingForm } from '../../../main-page/components/sorting-form/sorting-form';
import { OfferCard } from '../../../../components/offer-card/offer-card';
import { useEffect, useState } from 'react';
import { Nullable } from 'vitest';

type OffersSectionProps = {
  offers: Offer[];
}

function OffersSection({ offers }: OffersSectionProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);
  const handleCardHover = (offer?: Offer) => {
    setActiveOffer(offer || null);
  };
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(activeOffer);
  });

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {offers[0].city}</b>
      < SortingForm />
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} handleHover={handleCardHover}/>
        ))}
      </div>
    </section>
  );
}

export { OffersSection };

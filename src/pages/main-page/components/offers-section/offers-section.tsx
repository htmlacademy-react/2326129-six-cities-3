import { SortingForm } from '../sorting-form/sorting-form';
import { OfferPreview } from '../../../offer-page/types/types';
import { PlaceCard } from '../../../../components/place-card/place-card';
import { SortingOption } from '../../../../const';
import { memo } from 'react';

type OffersSectionProps = {
  offers: OfferPreview[];
  onCardHover: (offer?: OfferPreview) => void;
  sortingOption: SortingOption;
  onSortChange: (option: SortingOption) => void;
}

function OffersSectionComponent({ offers, onCardHover, sortingOption, onSortChange }: OffersSectionProps): JSX.Element {

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {offers.length > 0
          ? `${offers.length} ${offers.length === 1 ? 'place' : 'places'} to stay in ${offers[0].city.name}`
          : 'No places to stay'}
      </b>
      < SortingForm sortingOption={sortingOption} onSortChange={onSortChange} />
      <div className="cities__places-list places__list tabs__content">
        {offers && offers.length > 0 && offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            variant='cities'
            onCardHover={onCardHover}
          />
        ))}
      </div>
    </section>
  );
}

export const OffersSection = memo(OffersSectionComponent);

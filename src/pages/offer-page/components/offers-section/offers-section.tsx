import { SortingForm } from '../../../main-page/components/sorting-form/sorting-form';
import { OfferPreview } from '../../types/types';
import { PlaceCard } from '../../../../components/place-card/place-card';
import { SortingOption } from '../../../../const';

type OffersSectionProps = {
  offers: OfferPreview[];
  onCardHover: (offer?: OfferPreview) => void;
  sortingOption: SortingOption;
  onSortChange: (option: SortingOption) => void;
}

function OffersSection({ offers, onCardHover, sortingOption, onSortChange }: OffersSectionProps): JSX.Element {

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers && offers.length > 0
        ? `${offers.length} place${offers.length > 1 && 's'} to stay in ${offers[0].city.name}`
        : 'No places to stay'}
      </b>
      < SortingForm sortingOption={sortingOption} onSortChange={onSortChange} />
      <div className="cities__places-list places__list tabs__content">
        {offers && offers.length > 0 && offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            variant='cities'
            onMouseEnter={() => onCardHover(offer)}
            onMouseLeave={() => onCardHover()}
          />
        ))}
      </div>
    </section>
  );
}

export { OffersSection };

import { memo } from 'react';

const offerItems = [ 'Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cabel TV', 'Fridge' ];

function OfferItemsComponent(): JSX.Element {
  return (
    <ul className="offer__inside-list">
      {offerItems && offerItems.length > 0 && offerItems.map((item) => (
        <li key={item} className="offer__inside-item">
          {item}
        </li>
      ))}
    </ul>
  );
}

export const OfferItems = memo(OfferItemsComponent);

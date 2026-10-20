import { memo } from 'react';

type OfferItemsProps = {
  goods: string[];
}

function OfferItemsComponent({ goods }: OfferItemsProps): JSX.Element {
  return (
    <ul className="offer__inside-list">
      {goods && goods.length > 0 && goods.map((item) => (
        <li key={item} className="offer__inside-item">
          {item}
        </li>
      ))}
    </ul>
  );
}

export const OfferItems = memo(OfferItemsComponent);

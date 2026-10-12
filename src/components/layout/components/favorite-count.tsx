import { useAppSelector } from '../../../hooks/store';

function FavoriteCount(): JSX.Element {
  const count = useAppSelector((state) => state.favoriteOffers.length);
  return (<span className="header__favorite-count">{count}</span>);
}

export { FavoriteCount };

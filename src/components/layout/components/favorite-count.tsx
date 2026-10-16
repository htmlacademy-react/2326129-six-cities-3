import { useAppSelector } from '../../../hooks/store';
import { selectFavoriteOffers } from '../../../store/selectors';

function FavoriteCount(): JSX.Element {
  const count = useAppSelector(selectFavoriteOffers).length;
  return (<span className="header__favorite-count">{count}</span>);
}

export { FavoriteCount };

import { useAppSelector } from '../../../../hooks/store';
import { selectFavoriteCount } from '../../../../store/selectors';

function FavoriteCount(): JSX.Element {
  const count = useAppSelector(selectFavoriteCount);
  return (<span className="header__favorite-count">{count}</span>);
}

export { FavoriteCount };

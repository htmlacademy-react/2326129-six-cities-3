import { Outlet, Link, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getLayoutState } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { logoutAction } from '../../types/api-actions';

function Layout(): JSX.Element {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers);
  const favoriteAmount = offers.filter((offer) => offer.isFavorite).length;

  const { rootClassName, logoLinkClassName, shouldRenderUser, shouldRenderFooter } =
    getLayoutState(pathname as AppRoute);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const handleLogout = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <div className={`page page--gray${rootClassName}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Root} className={`header__logo-link${logoLinkClassName}`}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            {shouldRenderUser && (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {isAuthorized && user ? (
                    <>
                      <li className="header__nav-item user">
                        <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                          <div
                            className="header__avatar-wrapper user__avatar-wrapper"
                            style={user?.avatarUrl ? {backgroundImage: `url(${user.avatarUrl})` } : undefined}
                          />
                          <span className="header__user-name user__name">
                            {user?.email}
                          </span>
                          <span className="header__favorite-count">{favoriteAmount}</span>
                        </Link>
                      </li>
                      <li className="header__nav-item">
                        <Link
                          to="#"
                          className="header__nav-link"
                          onClick={handleLogout}
                        >
                          <span className="header__signout">Sign out</span>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className="header__nav-item user">
                      <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper" />
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>
      <Outlet />
      {shouldRenderFooter && (
        <footer className="footer container">
          <Link to={AppRoute.Root} className="footer__logo-link">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer>
      )}
    </div>
  );
}

export { Layout };

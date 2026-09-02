import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';


function Layout (): JSX.Element {
  return (
    <Fragment>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" title="/" className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>{' '}
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to='/login' title='/login' className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>{' '}
                </li>
                <li className="header__nav-item">
                  <Link to='/login' title='/login' className="header__nav-link">
                    <span className="header__signout">Sign out</span>
                  </Link>{' '}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}

export { Layout };

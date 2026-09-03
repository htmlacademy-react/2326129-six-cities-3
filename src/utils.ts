import { AppRoute } from './const';

const getLayoutState = (pathname: AppRoute) => {
  let rootClassName = '';
  let logoLinkClassName = '';
  let shouldRenderUser = true;
  let shouldRenderFooter = false;

  if(pathname === AppRoute.Root) {
    rootClassName = ' page--main';
    logoLinkClassName = ' header__logo-link--active';
  } else if(pathname === AppRoute.Login) {
    rootClassName = ' page--login';
    shouldRenderUser = false;
  } else if(pathname === AppRoute.Favorites) {
    shouldRenderFooter = true;
  }
  return {rootClassName, logoLinkClassName, shouldRenderUser, shouldRenderFooter};
};

export { getLayoutState };

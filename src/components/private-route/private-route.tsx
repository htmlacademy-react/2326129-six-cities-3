import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  isReverse?: boolean;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authorizationStatus, isReverse, children } = props;

  const isAllowed = authorizationStatus === (isReverse ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth);
  const redirectTo = isReverse ? AppRoute.Root : AppRoute.Login;

  return isAllowed ? children : <Navigate to={redirectTo} />;
}

export default PrivateRoute;

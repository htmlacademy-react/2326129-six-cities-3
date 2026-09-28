import { FormEvent, useRef } from 'react';
import { loginAction } from '../../types/api-actions';
import { useAppDispatch } from '../../hooks/store';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';
// import { AuthData } from '../../store/auth-data';

function AuthScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const onSubmit = (authData: AuthData) => {
  //   dispatch(loginAction(authData));
  // };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };
  return (
    <>
      <section className="login">
        <Helmet>
          <title>6 cities: authorization</title>
        </Helmet>
        <h1 className="login__title">Sign in</h1>
        <form
          className="login__form form"
          action="#"
          method="post"
          onSubmit={handleSubmit}
        >
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">E-mail</label>
            <input
              ref={loginRef}
              className="login__input form__input"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">Password</label>
            <input
              ref={passwordRef}
              className="login__input form__input"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <button
            onClick={() => navigate(AppRoute.Root)}
            className="login__submit form__submit button"
            type="submit"
          >
              Sign in
          </button>
        </form>
      </section>
      <section className="locations locations--login locations--current">
        <div className="locations__item">
          <Link to={AppRoute.Root} className="locations__item-link">
            <span>Amsterdam</span>
          </Link>
        </div>
      </section>
    </>
  );
}

export { AuthScreen };

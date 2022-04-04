import { FormEvent, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import SignInErrors from '../../components/sign-in-errors/sign-in-errors';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import { isUserAuth } from '../../utils';

function SignInPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const [error, setError] = useState('');

  const onSubmit = (authData: AuthData) => {
    store.dispatch(loginAction(authData));
    return (<Navigate to="/" />);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const login = loginRef.current !== null ? loginRef.current.value : '';
    const password = passwordRef.current !== null ? passwordRef.current.value : '';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login)) {
      toast.error('Email is invalid');
      setError('email');
      return;
    }

    if (!/[a-zA-Z]+[0-9]/.test(password) || !/\d/.test(password) || password.includes(' ')) {
      toast.error('Password is invalid');
      setError('signIn');
      return;
    }

    onSubmit({
      login: login,
      password: password,
    });
  };

  if (isUserAuth(authorizationStatus)) {
    return (<Navigate to="/" />);
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          method="post"
          onSubmit={(evt: FormEvent<HTMLFormElement>) => {
            evt.preventDefault();
            handleSubmit(evt);
          }}
        >
          <SignInErrors errorType={error}/>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                ref={loginRef}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                ref={passwordRef}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default SignInPage;

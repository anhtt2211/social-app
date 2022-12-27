import { Fragment, useEffect } from 'react';
import {
  HashRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';
import { Header } from './components/Header';
import { store } from 'app/store';
import { endLoad, loadUserRequest } from 'features/auth/auth.slice';
import { SignInPage } from 'pages/sign-in/sign-in';
import { SignUpPage } from 'pages/sign-up';
import { ArticlePage } from './pages/article-page/article-page';
import { HomePage } from './pages/home-page/home-page';
import { useAppSelector } from 'app/hooks';
import { ProfilePage } from 'pages/profile-page';
import { SettingPage } from 'pages/setting-page';

function App() {
  const { loading, loginIn: userIsLogged } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    load();
  }, []);

  return (
    <HashRouter>
      {!loading ? (
        <Fragment>
          <Header />
          <Switch>
            <GuestOnlyRoute userIsLogged={userIsLogged} exact path="/">
              <HomePage />
            </GuestOnlyRoute>
            <GuestOnlyRoute userIsLogged={userIsLogged} exact path="/sign-in">
              <SignInPage />
            </GuestOnlyRoute>
            <GuestOnlyRoute userIsLogged={userIsLogged} exact path="/sign-up">
              <SignUpPage />
            </GuestOnlyRoute>

            <UserOnlyRoute userIsLogged={userIsLogged} path="/article/:slug">
              <ArticlePage />
            </UserOnlyRoute>
            <UserOnlyRoute
              userIsLogged={userIsLogged}
              exact
              path="/profile/:username"
            >
              <ProfilePage />
            </UserOnlyRoute>
            <UserOnlyRoute userIsLogged={userIsLogged} exact path="/settings">
              <SettingPage />
            </UserOnlyRoute>
          </Switch>
        </Fragment>
      ) : null}
    </HashRouter>
  );
}

export default App;

function load() {
  const token = localStorage.getItem('token');
  if (!store.getState().auth.loading || !token) {
    store.dispatch(endLoad());
    return;
  }

  if (token) {
    store.dispatch(loadUserRequest());
  }
}

/* istanbul ignore next */
function GuestOnlyRoute({
  children,
  userIsLogged,
  ...rest
}: {
  children: JSX.Element | JSX.Element[];
  userIsLogged: boolean;
} & RouteProps) {
  return (
    <Route {...rest}>
      {children}
      {userIsLogged && <Redirect to="/" />}
    </Route>
  );
}

/* istanbul ignore next */
function UserOnlyRoute({
  children,
  userIsLogged,
  ...rest
}: {
  children: JSX.Element | JSX.Element[];
  userIsLogged: boolean;
} & RouteProps) {
  return (
    <Route {...rest}>
      {children}
      {!userIsLogged && <Redirect to="/" />}
    </Route>
  );
}

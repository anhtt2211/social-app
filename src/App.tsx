import { Fragment, useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { store } from 'app/store';
import { loadUserRequest } from 'features/auth/auth.slice';
import { SignInPage } from 'pages/sign-in/sign-in';
import { SignUpPage } from 'pages/sign-up';
import { ArticlePage } from './pages/article-page/article-page';
import { HomePage } from './pages/home-page/home-page';
import { useAppSelector } from 'app/hooks';

function App() {
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    load();
  }, []);

  return (
    <HashRouter>
      {!loading ? (
        <Fragment>
          <Header />
          <Switch>
            <Route path="/article/:slug">
              <ArticlePage />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/sign-in">
              <SignInPage />
            </Route>
            <Route exact path="/sign-up">
              <SignUpPage />
            </Route>
          </Switch>
        </Fragment>
      ) : null}
    </HashRouter>
  );
}

export default App;

function load() {
  const token = localStorage.getItem('token');

  if (token) {
    store.dispatch(loadUserRequest());
  }
}

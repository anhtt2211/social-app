import { Fragment } from 'react';
import {
  HashRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './pages/home-page/home-page';
import { ArticlePage } from './pages/article-page/article-page';
import { SignInPage } from 'pages/sign-in/sign-in';
import { SignUpPage } from 'pages/sign-up';

function App() {
  return (
    <HashRouter>
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
        {/* <Footer /> */}
      </Fragment>
    </HashRouter>
  );
}

export default App;

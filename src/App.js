import './App.css';
import { Route, Switch } from 'react-router';
import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation/Navigation.jsx';

const HomePage = lazy(() =>
  import('./pages/HomePage/HomePage' /* webpackChunkName: "home_page" */),
);
const NotFoundPage = lazy(() =>
  import(
    './pages/NotFoundPage/NotFoundPage' /* webpackChunkName: "not_found__page" */
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movies_details_page" */
  ),
);

function App() {
  return (
    <section className="container">
      <Navigation />

      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route path="/courses/:courseId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </section>
  );
}

export default App;

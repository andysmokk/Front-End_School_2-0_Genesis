import './App.css';
import { Route, Switch } from 'react-router';
import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation/Navigation.jsx';

const CoursesPage = lazy(() =>
  import(
    './pages/CoursesPage/CoursesPage' /* webpackChunkName: "courses_page" */
  ),
);
const NotFoundPage = lazy(() =>
  import(
    './pages/NotFoundPage/NotFoundPage' /* webpackChunkName: "not_found__page" */
  ),
);
const CourseDetailsPage = lazy(() =>
  import(
    './pages/CourseDetailsPage/CourseDetailsPage' /* webpackChunkName: "course_details_page" */
  ),
);

function App() {
  return (
    <section className="container">
      <Navigation />

      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route exact path="/">
            <CoursesPage />
          </Route>

          <Route path="/courses/:courseId">
            <CourseDetailsPage />
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

import './App.css';
// import { Route, Switch } from 'react-router';
// import { Switch, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// import Navigation from './components/Navigation/Navigation.jsx';
import DrawerAppBar from './components/AppBar/AppBar';

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
      <DrawerAppBar />

      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<CoursesPage />} />
          {/* <CoursesPage /> */}
          {/* </Route> */}

          <Route path="/course/:courseId" element={<CourseDetailsPage />} />
          {/* <CourseDetailsPage /> */}
          {/* </Route> */}

          <Route path="*" element={<NotFoundPage />} />
          {/* <NotFoundPage /> */}
          {/* </Route> */}
        </Routes>
      </Suspense>
    </section>
  );
}

export default App;

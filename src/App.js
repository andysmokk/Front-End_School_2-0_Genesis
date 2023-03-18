import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
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
          <Route path="/course/:courseId" element={<CourseDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </section>
  );
}

export default App;

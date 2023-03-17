import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import coursesAPI from '../../services/coursesApi';
import Pagination from '../../components/Pagination/Pagination';
import s from './CoursesPage.module.css';

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 10;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    coursesAPI.getCourses().then(({ data }) => {
      setCourses(data.courses);
    });
  }, []);

  return (
    <>
      <h1 className={s.title}>List of courses</h1>
      <ul className={s.list}>
        {currentCourses &&
          currentCourses.map(course => (
            <li key={course.id} className={s.item}>
              <Link
                to={{
                  pathname: `/courses/${course.id}`,
                }}
              >
                <h2>{course.title}</h2>{' '}
                <img
                  src={course.previewImageLink + '/cover.webp'}
                  alt={course.description}
                />
                <p>{course.description}</p>
                <p>Count of lessons: {course.lessonsCount}</p>
                <p>
                  {course.tags &&
                    course.tags.map(element =>
                      element
                        .split(' ')
                        .map(
                          word => word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(', '),
                    )}
                </p>
                <p>Rating: {course.rating}</p>
              </Link>
            </li>
          ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default CoursesPage;

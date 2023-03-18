import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import coursesAPI from '../../services/coursesApi';
import Pagination from '../../components/Pagination/Pagination';
import s from './CoursesPage.module.css';

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 12;
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
      <ul className={s.list}>
        {currentCourses &&
          currentCourses.map(course => (
            <li key={course.id} className={s.item}>
              <Link
                className={s.link}
                to={{
                  pathname: `/course/${course.id}`,
                }}
              >
                <img
                  className={s.img}
                  src={course.previewImageLink + '/cover.webp'}
                  alt={course.description}
                />
                <div className={s.box}>
                  <h2 className={s.title}>{course.title}</h2>
                  <p className={s.description}>{course.description}</p>
                  <p className={s.lessons}>
                    Count of lessons: {course.lessonsCount}
                  </p>
                  <div className={s.box_rating}>
                    <p className={s.tags}>
                      {course.tags &&
                        course.tags.map(element =>
                          element
                            .split(' ')
                            .map(
                              word =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(', '),
                        )}
                    </p>
                    <p className={s.rating}>Rating: {course.rating}</p>
                  </div>
                </div>
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

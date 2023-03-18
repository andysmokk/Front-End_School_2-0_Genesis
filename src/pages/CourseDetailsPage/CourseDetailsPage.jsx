/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import coursesAPI from '../../services/coursesApi';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import s from './CourseDetailsPage.module.css';

function CourseDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  console.log(
    '🚀 ~ file: CourseDetailsPage.jsx:15 ~ CourseDetailsPage ~ course:',
    course,
  );
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoTitle, setVideoTitle] = useState(null);
  const [lessonId, setLessonId] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    coursesAPI.getCourse(courseId).then(course => {
      setCourse(course);
      setVideoUrl(course.lessons[0].link);
      setVideoTitle(course.lessons[0].title);
      setLessonId(course.lessons[0].id);
      setStatus(course.lessons[0].status);
    });
  }, [courseId]);

  const onClickGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };

  const onLinkClick = (title, url, id, status) => {
    setVideoUrl(url);
    setVideoTitle(title);
    setLessonId(id);
    setStatus(status);
  };

  return (
    <>
      <button type="submit" onClick={onClickGoBack} className={s.button}>
        {location?.state?.from?.label ?? 'GO BACK'}
      </button>
      {course && (
        <div>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <VideoPlayer course={course} url={videoUrl} id={lessonId} />
          <hr />
          <h2>
            {videoTitle} {''}({status})
          </h2>
          <h3>Lessons</h3>
          <ul>
            {course.lessons &&
              course.lessons.map(lesson => (
                <li key={lesson.id}>
                  <a
                    href="#"
                    onClick={() =>
                      onLinkClick(
                        lesson.title,
                        lesson.link,
                        lesson.id,
                        lesson.status,
                      )
                    }
                  >
                    {lesson.title} {''}({status})
                    <img
                      src={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`}
                      alt={lesson.description}
                    />
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default CourseDetailsPage;

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
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoTitle, setVideoTitle] = useState(null);
  const [lessonId, setLessonId] = useState('');

  useEffect(() => {
    coursesAPI.getCourse(courseId).then(course => {
      setCourse(course);
      setVideoUrl(course.lessons[0].link);
      setVideoTitle(course.lessons[0].title);
      setLessonId(course.lessons[0].id);
    });
  }, [courseId]);

  console.log(course);

  const onClickGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };

  const onLinkClick = (title, url, id) => {
    setVideoUrl(url);
    setVideoTitle(title);
    setLessonId(id);
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
          <h2>{videoTitle}</h2>
          <ul>
            {course.lessons &&
              course.lessons.map(lesson => (
                <li key={lesson.id}>
                  <a
                    href="#"
                    onClick={() =>
                      onLinkClick(lesson.title, lesson.link, lesson.id)
                    }
                  >
                    {lesson.title}
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

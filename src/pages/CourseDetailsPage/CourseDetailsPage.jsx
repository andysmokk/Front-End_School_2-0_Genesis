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

  useEffect(() => {
    coursesAPI.getCourse(courseId).then(course => {
      setCourse(course);
      setVideoUrl(course.lessons[0].link);
    });
  }, [courseId]);

  console.log(course);

  const onClickGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };

  const onLinkClick = url => {
    setVideoUrl(url);
  };

  return (
    <>
      <button type="submit" onClick={onClickGoBack} className={s.button}>
        {location?.state?.from?.label ?? 'GO BACK'}
      </button>
      {course && (
        <div>
          <VideoPlayer course={course} url={videoUrl} />
          <hr />
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <ul>
            {course.lessons &&
              course.lessons.map(lesson => (
                <li key={lesson.id}>
                  <a href="#" onClick={() => onLinkClick(lesson.link)}>
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

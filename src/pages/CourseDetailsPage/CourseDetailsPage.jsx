/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import coursesAPI from '../../services/coursesApi';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import ButtonSizes from '../../components/Button/Button';
import s from './CourseDetailsPage.module.css';

function CourseDetailsPage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
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

  const onLinkClick = (title, url, id, status) => {
    setVideoUrl(url);
    setVideoTitle(title);
    setLessonId(id);
    setStatus(status);
  };

  return (
    <>
      {course && (
        <div>
          <div className={s.box}>
            <ButtonSizes />
            <h2 className={s.course_title}>{course.title}</h2>
          </div>

          <p className={s.description}>{course.description}</p>
          <div className={s.box_grid}>
            <div>
              <VideoPlayer course={course} url={videoUrl} id={lessonId} />
              <div className={s.box_title}>
                <p className={s.lesson_text}>Lesson</p>
                <p className={s.status_text}>{status}</p>
                <h2 className={s.lesson_title}>{videoTitle}</h2>
              </div>
            </div>
            <div className={s.box_lessons}>
              <h3>Lessons</h3>
              <ul className={s.list}>
                {course.lessons &&
                  course.lessons.map(lesson => (
                    <li className={s.item} key={lesson.id}>
                      <a
                        className={s.link}
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
                        {lesson.title}
                        <img
                          className={s.img}
                          src={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`}
                          alt={lesson.description}
                        />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseDetailsPage;

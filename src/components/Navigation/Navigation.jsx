import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => (
  <>
    <nav>
      <NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>
        My courses
      </NavLink>
      <NavLink
        to="/find-course"
        className={s.link}
        activeClassName={s.activeLink}
      >
        Find course
      </NavLink>
    </nav>
    <hr />
  </>
);

export default Navigation;

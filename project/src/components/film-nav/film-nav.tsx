import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { NAVIGATION } from '../../const';

type FilmNavProps = {
  navActive: string;
  setNavActive: (nav: string) => void;
}

function FilmNav(props: FilmNavProps): JSX.Element {
  const {navActive, setNavActive} = props;

  const navHandler = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    setNavActive(event.currentTarget.innerText);
  };

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {Object.entries(NAVIGATION).map((nav, index) => {
          const [key, value] = nav;
          const keyValue=`${index}-${key}`;
          const isActive = navActive === value;
          return (
            <li
              key={keyValue}
              className={`film-nav__item ${isActive ? 'film-nav__item--active' : ''}`}
              onClick={navHandler}
            >
              <Link
                to=""
                className="film-nav__link"
              >
                {value}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default FilmNav;

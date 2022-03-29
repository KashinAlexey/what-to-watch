import { Link } from 'react-router-dom';
import { MouseEvent, useState } from 'react';

const GENRES = {
  ALL_GENRES: 'All genres',
  COMEDIES: 'Comedies',
  CRIME: 'Crime',
  DOCUMENTARY: 'Documentary',
  DRAMAS: 'Dramas',
  HORROR: 'Horror',
  KIDS_FAMILY: 'Kids & Family',
  ROMANCE: 'Romance',
  SCI_FI: 'Sci-F',
  THRILLERS: 'Thrillers',
};

function GanresFilter(): JSX.Element {
  const [genreActive, setGenreActive] = useState(GENRES.ALL_GENRES);

  const genresHandler = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    setGenreActive(event.currentTarget.innerText);
  };

  return (
    <ul className="catalog__genres-list">
      {Object.entries(GENRES).map((genre, index) => {
        const [key, value] = genre;
        const keyValue=`${index}-${key}`;
        const isActive = genreActive === value;
        return (
          <li
            key={keyValue}
            className={`catalog__genres-item ${isActive ? 'catalog__genres-item--active' : ''}`}
            onClick={genresHandler}
          >
            <Link
              to="/"
              className="catalog__genres-link"
            >
              {value}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default GanresFilter;

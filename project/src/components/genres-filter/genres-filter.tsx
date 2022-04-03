import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import { useAppSelector } from '../../hooks';

type GanresFilterProps = {
  genreActive: string;
  changeGanre: (genre: string) => void;
}

function GanresFilter(props: GanresFilterProps): JSX.Element {
  const {genreActive, changeGanre} = props;
  const {genres} = useAppSelector(({GLOBAL_DATA}) => GLOBAL_DATA);

  const genresHandler = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    changeGanre(event.currentTarget.innerText);
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, index) => {
        const keyValue=`${index}-${genre}`;
        const isActive = genreActive === genre;
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
              {genre}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default GanresFilter;

import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Film } from '../../types/film';

type FilmCardSmallProps = {
  film: Film;
}

function FilmCardSmall(props: FilmCardSmallProps): JSX.Element {
  const {film} = props;
  const {id, name, previewImage} = film;

  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img
          src={previewImage}
          alt={name}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          to={`${AppRoute.Film}/${id}`}
          className="small-film-card__link"
        >
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCardSmall;

import { Film } from '../../types/film';
import FilmCardBtn from '../film-card-btn/film-card-btn';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';

type FilmCardProps = {
  promoFilm: Film;
}

function FilmCard(props: FilmCardProps): JSX.Element {
  const {promoFilm} = props;
  const isPromo = true;
  const {id, name, posterImage, backgroundImage, genre, released, isFavorite} = promoFilm;

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img
          src={backgroundImage}
          alt={name}
        />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <Logo />
        <UserBlock />
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img
              src={posterImage}
              alt={name}
              width="218"
              height="327"
            />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{released}</span>
            </p>

            <FilmCardBtn
              isFavorite={isFavorite}
              id={id}
              isPromo={isPromo}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilmCard;

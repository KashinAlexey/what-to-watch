import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchFavoritesAction, fetchSetIsFavoriteAction } from '../../store/api-actions';
import { Film } from '../../types/film';
import { isUserAuth } from '../../utils';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';

type FilmCardProps = {
  promoFilm: Film;
}

function FilmCard(props: FilmCardProps): JSX.Element {
  const {promoFilm} = props;
  const {id, name, posterImage, backgroundImage, genre, released, isFavorite} = promoFilm;
  const {authorizationStatus} = useAppSelector(({USER}) => USER);

  const navigate = useNavigate();

  const onPlayClick = () => {
    navigate(`${AppRoute.Player}/${id}`);
  };

  const onMyListClick = async () => {
    if (!isUserAuth(authorizationStatus)) {
      navigate(AppRoute.Login);
      return;
    }

    const status = isFavorite ? 0 : 1;
    await store.dispatch(fetchSetIsFavoriteAction({id, status}));
    await store.dispatch(fetchFavoritesAction());
  };

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

            <div className="film-card__buttons">
              <button
                className="btn btn--play film-card__button"
                type="button"
                onClick={onPlayClick}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button
                className="btn btn--list film-card__button"
                type="button"
                onClick={onMyListClick}
              >
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilmCard;

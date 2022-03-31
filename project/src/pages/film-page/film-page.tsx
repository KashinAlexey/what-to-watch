import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilmCardSmall from '../../components/film-card-small/film-card-small';
import FilmCardOverview from '../../components/film-card-overview/film-card-overview';
import FilmNav from '../../components/film-nav/film-nav';
import FilmRating from '../../components/film-rating/film-rating';
import Footer from '../../components/footer/footer';
import Loading from '../../components/loading/loading';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchCommentsAction } from '../../store/api-actions';
import { fetchFilmAction } from '../../store/api-actions';
import { fetchSimilarFilmsAction } from '../../store/api-actions';
import { resetAllFilmAction } from '../../store/app-local-data/app-local-data';
import { NAVIGATION } from '../../const';

function FilmPage(): JSX.Element {
  const params = useParams();
  const {film, similarFilms, comments, isFilmLoaded, isSimilarFilmLoaded, isCommentsLoaded} = useAppSelector(({LOCAL_DATA}) => LOCAL_DATA);
  const [selectedFilmId, setSelectedFilmId] = useState<number>(0);
  const [navActive, setNavActive] = useState(NAVIGATION.OVERVIEW);

  const {backgroundImage, name, genre, released, posterImage, rating, scoresCount, description, director, starring} = film;

  useEffect(() => {
    if (params.id && +params.id !== selectedFilmId) {
      setSelectedFilmId(+params.id);
      store.dispatch(resetAllFilmAction());
      store.dispatch(fetchFilmAction(+params.id));
      store.dispatch(fetchSimilarFilmsAction(+params.id));
      store.dispatch(fetchCommentsAction(+params.id));
    }
  }, [selectedFilmId, params]);

  const isLoaded = isFilmLoaded && isSimilarFilmLoaded && isCommentsLoaded;

  if (!isLoaded) {
    return (
      <Loading />
    );
  }

  // eslint-disable-next-line no-console
  console.log(film);
  // eslint-disable-next-line no-console
  console.log(similarFilms);
  // eslint-disable-next-line no-console
  console.log(comments);

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
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
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn film-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={posterImage}
                alt={name}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <FilmNav
                navActive={navActive}
                setNavActive={setNavActive}
              />

              <FilmRating
                rating={rating}
                scoresCount={scoresCount}
              />

              <FilmCardOverview
                description={description}
                director={director}
                starring={starring}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {similarFilms.slice(0, 4).map((similarFilm) => {
              const keyValue=`${similarFilm.id}`;
              return <FilmCardSmall key={keyValue} film={similarFilm} />;
            })}
          </div>
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default FilmPage;

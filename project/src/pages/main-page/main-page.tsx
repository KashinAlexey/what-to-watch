import React, { useEffect, useState } from 'react';
import FilmCard from '../../components/film-card/film-card';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import GanresFilter from '../../components/genres-filter/genres-filter';
import ShowMoreBtn from '../../components/show-more-btn/show-more-btn';
import { Film, Films } from '../../types/film';
import { store } from '../../store';
import { loadGenresAction } from '../../store/app-global-data/app-global-data';

type MainPageProps = {
  films: Films;
  promoFilm: Film;
}

export const getFilteredData = (films: Films, filterType: string) => {
  let fileredData = films;

  if (filterType !== 'All genres') {
    fileredData = films.slice().filter((film) => film.genre === filterType);
  }

  return fileredData;
};

export const getGanres = (films: Films) => {
  const genres = new Set();
  genres.add('All genres');
  films.forEach((film) => genres.add(film.genre));

  return [...genres];
};

const FILM_COUNT_PER_STEP = 8;

function MainPage(props: MainPageProps): JSX.Element {
  const {films, promoFilm} = props;
  const [renderedFilmCount, setRenderedFilmCount] = useState(FILM_COUNT_PER_STEP);
  const [genreActive, setGenreActive] = useState('All genres');
  const filteredData = getFilteredData(films, genreActive);
  const filmCount = filteredData.length;

  const showMoreBtnHandler = () => {
    const newRenderedFilmCount = renderedFilmCount + FILM_COUNT_PER_STEP;
    setRenderedFilmCount(newRenderedFilmCount);
  };

  const changeGanre = (genre: string) => {
    setGenreActive(genre);
    setRenderedFilmCount(FILM_COUNT_PER_STEP);
  };

  useEffect(() => {
    store.dispatch(loadGenresAction(getGanres(films)));
  }, [films]);

  return (
    <React.Fragment>
      <FilmCard promoFilm={promoFilm} />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GanresFilter
            genreActive={genreActive}
            changeGanre={changeGanre}
          />

          <FilmList films={filteredData.slice(0, renderedFilmCount)}/>

          {renderedFilmCount >= filmCount ? '' : <ShowMoreBtn showMoreBtnHandler={showMoreBtnHandler}/>}

        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default MainPage;

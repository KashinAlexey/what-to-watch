import React, { useState } from 'react';
import FilmCard from '../../components/film-card/film-card';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import GanresFilter from '../../components/genres-filter/genres-filter';
import ShowMoreBtn from '../../components/show-more-btn/show-more-btn';
import { Film, Films } from '../../types/film';

type MainPageProps = {
  films: Films;
  promoFilm: Film;
}

const FILM_COUNT_PER_STEP = 8;

function MainPage(props: MainPageProps): JSX.Element {
  const {films, promoFilm} = props;
  const filmCount = films.length;
  const [renderedFilmCount, setRenderedFilmCount] = useState(FILM_COUNT_PER_STEP);

  const showMoreBtnHandler = () => {
    const newRenderedFilmCount = renderedFilmCount + FILM_COUNT_PER_STEP;
    setRenderedFilmCount(newRenderedFilmCount);
  };

  return (
    <React.Fragment>
      <FilmCard promoFilm={promoFilm} />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GanresFilter />

          <FilmList films={films.slice(0, renderedFilmCount)}/>

          {renderedFilmCount >= filmCount ? '' : <ShowMoreBtn showMoreBtnHandler={showMoreBtnHandler}/>}

        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default MainPage;

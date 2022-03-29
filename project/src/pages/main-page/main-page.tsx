import React from 'react';
import FilmCard from '../../components/film-card/film-card';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import GanresFilter from '../../components/genres-filter/genres-filter';
import { Films } from '../../types/film';

type MainPageProps = {
  films: Films;
}

function MainPage(props: MainPageProps): JSX.Element {
  const {films} = props;

  return (
    <React.Fragment>
      <FilmCard />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GanresFilter />

          <FilmList films={films}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default MainPage;

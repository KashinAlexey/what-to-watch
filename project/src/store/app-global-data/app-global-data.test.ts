import { appGlobalData } from './app-global-data';
import { loadFilmsAction } from './app-global-data';
import { loadFavoritesAction } from './app-global-data';
import { changeFavoriteAction } from './app-global-data';
import { loadGenresAction} from './app-global-data';
import { makeFakeFilm, makeFakeGenres } from '../../utils/mock';

const firstfilm = makeFakeFilm();
firstfilm.id = 1;
const secondFilm = makeFakeFilm();
secondFilm.id = 2;
const films = [firstfilm, secondFilm];
const newSecondFilm = makeFakeFilm();
newSecondFilm.id = 2;
newSecondFilm.isFavorite = true;
const newFilms = [firstfilm, newSecondFilm];
const genres = makeFakeGenres();

describe('Reducer: app-global-data', () => {
  it('without additional parameters should return initial state', () => {
    expect(appGlobalData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        films: [],
        favorites: [],
        genres: [],
        isFilmsLoaded: false,
        isFavoritesLoaded: false,
      });
  });

  it('should update films by load films', () => {
    const state = {
      films: [],
      favorites: [],
      genres: [],
      isFilmsLoaded: false,
      isFavoritesLoaded: false,
    };

    expect(appGlobalData.reducer(state, loadFilmsAction(films)))
      .toEqual({
        films: films,
        favorites: [],
        genres: [],
        isFilmsLoaded: true,
        isFavoritesLoaded: false,
      });
  });

  it('should update favorites by load favorites', () => {
    const state = {
      films: films,
      favorites: [],
      genres: [],
      isFilmsLoaded: true,
      isFavoritesLoaded: false,
    };

    expect(appGlobalData.reducer(state, loadFavoritesAction(films)))
      .toEqual({
        films: films,
        favorites: films,
        genres: [],
        isFilmsLoaded: true,
        isFavoritesLoaded: true,
      });
  });

  it('should update genres by load genres', () => {
    const state = {
      films: films,
      favorites: films,
      genres: [],
      isFilmsLoaded: true,
      isFavoritesLoaded: true,
    };

    expect(appGlobalData.reducer(state, loadGenresAction(genres)))
      .toEqual({
        films: films,
        favorites: films,
        genres: genres,
        isFilmsLoaded: true,
        isFavoritesLoaded: true,
      });
  });

  it('should change favorite data state', () => {
    const state = {
      films: films,
      favorites: films,
      genres: genres,
      isFilmsLoaded: true,
      isFavoritesLoaded: true,
    };

    expect(appGlobalData.reducer(state, changeFavoriteAction(newSecondFilm)))
      .toEqual({
        films: newFilms,
        favorites: films,
        genres: genres,
        isFilmsLoaded: true,
        isFavoritesLoaded: true,
      });
  });
});

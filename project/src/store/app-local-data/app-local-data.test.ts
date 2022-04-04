import { appLocalData } from './app-local-data';
import { loadFilmAction} from './app-local-data';
import { loadSimilarFilmsAction } from './app-local-data';
import { loadCommentsAction } from './app-local-data';
import { resetAllFilmAction} from './app-local-data';
import { EMPTY_FILM } from '../../const';
import { makeFakeFilm } from '../../utils/mock';
import { makeFakeComment } from '../../utils/mock';

const film = makeFakeFilm();
const films = [film, film];
const comment = makeFakeComment();
const comments = [comment, comment];

describe('Reducer: app-local-data', () => {
  it('without additional parameters should return initial state', () => {
    expect(appLocalData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        film: EMPTY_FILM,
        similarFilms: [],
        comments: [],
        isFilmLoaded: false,
        isSimilarFilmLoaded: false,
        isCommentsLoaded: false,
      });
  });

  it('should update film by load film', () => {
    const state = {
      film: EMPTY_FILM,
      similarFilms: [],
      comments: [],
      isFilmLoaded: false,
      isSimilarFilmLoaded: false,
      isCommentsLoaded: false,
    };

    expect(appLocalData.reducer(state, loadFilmAction(film)))
      .toEqual({
        film: film,
        similarFilms: [],
        comments: [],
        isFilmLoaded: true,
        isSimilarFilmLoaded: false,
        isCommentsLoaded: false,
      });
  });

  it('should update similar films by load similar films', () => {
    const state = {
      film: film,
      similarFilms: [],
      comments: [],
      isFilmLoaded: true,
      isSimilarFilmLoaded: false,
      isCommentsLoaded: false,
    };

    expect(appLocalData.reducer(state, loadSimilarFilmsAction(films)))
      .toEqual({
        film: film,
        similarFilms: films,
        comments: [],
        isFilmLoaded: true,
        isSimilarFilmLoaded: true,
        isCommentsLoaded: false,
      });
  });

  it('should update comments by load comments', () => {
    const state = {
      film: film,
      similarFilms: films,
      comments: [],
      isFilmLoaded: true,
      isSimilarFilmLoaded: true,
      isCommentsLoaded: false,
    };

    expect(appLocalData.reducer(state, loadCommentsAction(comments)))
      .toEqual({
        film: film,
        similarFilms: films,
        comments: comments,
        isFilmLoaded: true,
        isSimilarFilmLoaded: true,
        isCommentsLoaded: true,
      });
  });

  it('should reset local data state', () => {
    const state = {
      film: film,
      similarFilms: films,
      comments: comments,
      isFilmLoaded: true,
      isSimilarFilmLoaded: true,
      isCommentsLoaded: true,
    };

    expect(appLocalData.reducer(state, resetAllFilmAction()))
      .toEqual({
        film: EMPTY_FILM,
        similarFilms: [],
        comments: [],
        isFilmLoaded: false,
        isSimilarFilmLoaded: false,
        isCommentsLoaded: false,
      });
  });
});

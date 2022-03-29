import { store } from '../store/index.js';
import { AuthorizationStatus } from '../const';
import { Film, Films } from './film.js';
import { Comments } from './comment.js';

export type AppGlobalData = {
  films: Films,
  favorites: Films,
  isFilmsLoaded: boolean,
  isFavoritesLoaded: boolean,
};

export type AppLocalData = {
  film: Film,
  similarFilms: Films,
  comments: Comments,
  isFilmLoaded: boolean,
  isSimilarFilmLoaded: boolean,
  isCommentsLoaded: boolean,
};

export type AppProcess = {
  promoFilm: Film,
  isPromoFilmLoaded: boolean,
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
};

export type State = ReturnType<typeof store.getState>;

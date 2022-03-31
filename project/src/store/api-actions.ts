import { createAsyncThunk } from '@reduxjs/toolkit';
import { api} from '../store';
import { store } from '../store';
import { saveToken } from '../services/token';
import { dropToken } from '../services/token';
import { APIRoute } from '../const';
import { AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data';
import { errorHandle } from '../services/error-handle';
import { PostFavorite } from '../types/post-favorite';
import { loadFilmsAction } from './app-global-data/app-global-data';
import { changeFavoriteAction } from './app-global-data/app-global-data';
import { loadFavoritesAction } from './app-global-data/app-global-data';
import { loadCommentsAction, loadFilmAction, loadSimilarFilmsAction } from './app-local-data/app-local-data';
import { requireAuthorization } from './user-process/user-process';
import { Film, Films } from '../types/film';
import { loadPromoFilmAction } from './app-process/app-process';
import { Comments, ShortComment } from '../types/comment';
import { User } from '../types/user';
import { dropLogin, saveLogin } from '../services/login';
import { dropAvatarUrl, saveAvatarUrl } from '../services/avatar';

export const fetchFilmsAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    try {
      const {data} = await api.get<Films>(APIRoute.Films);
      store.dispatch(loadFilmsAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFilmAction = createAsyncThunk(
  'data/fetchFilm',
  async (id: number) => {
    try {
      const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      store.dispatch(loadFilmAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk(
  'data/fetcSimilarFilms',
  async (id: number) => {
    try {
      const {data} = await api.get<Films>(`${APIRoute.Films}/${id}${APIRoute.SimilarFilms}`);
      store.dispatch(loadSimilarFilmsAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk(
  'data/fetchPromoFilm',
  async () => {
    try {
      const {data} = await api.get<Film>(`${APIRoute.PromoFilm}`);
      store.dispatch(loadPromoFilmAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk(
  'data/fetchFavorites',
  async () => {
    try {
      const {data} = await api.get<Films>(`${APIRoute.Favorite}`);
      store.dispatch(loadFavoritesAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchSetIsFavoriteAction = createAsyncThunk(
  'data/fetchSetIsFavorite',
  async ({id, status}: PostFavorite) => {
    try {
      const {data} = await api.post<Film>(`${APIRoute.Favorite}/${id}/${status}`);
      store.dispatch(changeFavoriteAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCommentsAction = createAsyncThunk(
  'data/fetchComments',
  async (id: number) => {
    try {
      const {data} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
      store.dispatch(loadCommentsAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCommentAction = createAsyncThunk(
  'data/fetchComment',
  async ({comment, rating, id}: ShortComment) => {
    try {
      const {data} = await api.post<Comments>(`${APIRoute.Comments}/${id}`, {comment, rating});
      store.dispatch(loadCommentsAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch(error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data: {token, avatarUrl}} = await api.post<User>(APIRoute.Login, {email, password});
      saveToken(token);
      saveLogin(email);
      saveAvatarUrl(avatarUrl);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dropLogin();
      dropAvatarUrl();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppGlobalData } from '../../types/state';

const initialState: AppGlobalData = {
  films: [],
  favorites: [],
  genres: [],
  isFilmsLoaded: false,
  isFavoritesLoaded: false,
};

export const appGlobalData = createSlice({
  name: NameSpace.globalData,
  initialState,
  reducers: {
    loadFilmsAction: (state, action) => {
      state.films = action.payload;
      state.isFilmsLoaded = true;
    },
    loadFavoritesAction: (state, action) => {
      state.favorites = action.payload;
      state.isFavoritesLoaded = true;
    },
    changeFavoriteAction: (state, action) => {
      const index = state.films.findIndex((film) => film.id === action.payload.id);
      state.films = [...state.films.slice(0, index), action.payload, ...state.films.slice(index + 1)];
    },
    loadGenresAction: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const {loadFilmsAction, loadFavoritesAction, changeFavoriteAction, loadGenresAction} = appGlobalData.actions;

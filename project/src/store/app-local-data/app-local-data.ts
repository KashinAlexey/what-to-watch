import { createSlice } from '@reduxjs/toolkit';
import { EMPTY_FILM } from '../../const';
import { NameSpace } from '../../const';
import { AppLocalData } from '../../types/state';

const initialState: AppLocalData = {
  film: EMPTY_FILM,
  similarFilms: [],
  comments: [],
  isFilmLoaded: false,
  isSimilarFilmLoaded: false,
  isCommentsLoaded: false,
};

export const appLocalData = createSlice({
  name: NameSpace.localData,
  initialState,
  reducers: {
    loadFilmAction: (state, action) => {
      state.film = action.payload;
      state.isFilmLoaded = true;
    },
    loadSimilarFilmsAction: (state, action) => {
      state.similarFilms = action.payload;
      state.isSimilarFilmLoaded = true;
    },
    loadCommentsAction: (state, action) => {
      state.comments = action.payload;
      state.isCommentsLoaded = true;
    },
    resetAllFilmAction: (state) => {
      state.film = EMPTY_FILM;
      state.comments = [];
      state.similarFilms = [];
      state.isCommentsLoaded = false;
      state.isSimilarFilmLoaded = false;
      state.isFilmLoaded = false;
    },
  },
});

export const {loadFilmAction, loadSimilarFilmsAction, loadCommentsAction, resetAllFilmAction} = appLocalData.actions;

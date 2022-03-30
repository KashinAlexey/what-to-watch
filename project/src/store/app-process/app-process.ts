import { createSlice } from '@reduxjs/toolkit';
import { EMPTY_FILM } from '../../const';
import { NameSpace } from '../../const';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  promoFilm: EMPTY_FILM,
  isPromoFilmLoaded: false,
};

export const appProcess = createSlice({
  name: NameSpace.process,
  initialState,
  reducers: {
    loadPromoFilmAction: (state, action) => {
      state.promoFilm = action.payload;
      state.isPromoFilmLoaded = true;
      // eslint-disable-next-line no-console
      console.log(action.payload, state.isPromoFilmLoaded);
    },
  },
});

export const {loadPromoFilmAction} = appProcess.actions;

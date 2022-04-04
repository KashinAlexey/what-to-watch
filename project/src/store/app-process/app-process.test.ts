import { appProcess } from './app-process';
import { loadPromoFilmAction } from './app-process';
import { EMPTY_FILM } from '../../const';
import { makeFakeFilm } from '../../utils/mock';

const film = makeFakeFilm();

describe('Reducer: app-process', () => {
  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        promoFilm: EMPTY_FILM,
        isPromoFilmLoaded: false,
      });
  });

  it('should update film by load film', () => {
    const state = {
      promoFilm: EMPTY_FILM,
      isPromoFilmLoaded: false,
    };

    expect(appProcess.reducer(state, loadPromoFilmAction(film)))
      .toEqual({
        promoFilm: film,
        isPromoFilmLoaded: true,
      });
  });
});

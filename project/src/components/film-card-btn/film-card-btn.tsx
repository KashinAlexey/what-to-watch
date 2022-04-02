import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchFavoritesAction, fetchSetIsFavoriteAction } from '../../store/api-actions';
import { isUserAuth } from '../../utils';

type FilmCardBtnProps = {
  isFavorite: boolean;
  id: number;
  isPromo: boolean;
}

function FilmCardBtn(props: FilmCardBtnProps): JSX.Element {
  const {isFavorite, id, isPromo} = props;
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const navigate = useNavigate();
  const [isChechedFavorite, setIsChechedFavorite] = useState(isFavorite);

  const onPlayClick = () => {
    navigate(`${AppRoute.Player}/${id}`);
  };

  const onMyListClick = async () => {
    if (!isUserAuth(authorizationStatus)) {
      navigate(AppRoute.Login);
      return;
    }

    const status = isChechedFavorite ? 0 : 1;
    await store.dispatch(fetchSetIsFavoriteAction({id, status}));
    await store.dispatch(fetchFavoritesAction());
    setIsChechedFavorite(!isChechedFavorite);
  };

  return (
    <div className="film-card__buttons">
      <button
        className="btn btn--play film-card__button"
        type="button"
        onClick={onPlayClick}
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>
      <button
        className="btn btn--list film-card__button"
        type="button"
        onClick={onMyListClick}
      >
        {isChechedFavorite ?
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list"></use>
          </svg> :
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"></use>
          </svg>}
        <span>My list</span>
      </button>
      {isPromo || !isUserAuth(authorizationStatus) ? '' :
        <Link to={`${AppRoute.Film}/${id}${AppRoute.AddReview}`} className="btn film-card__button">Add review</Link>}
    </div>
  );
}

export default FilmCardBtn;

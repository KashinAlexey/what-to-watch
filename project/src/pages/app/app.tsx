import MainPage from '../main-page/main-page';
import browserHistory from '../../browser-history';
import SignInPage from '../sign-in-page/sign-in-page';
import MyListPage from '../my-list-page/my-list-page';
import FilmPage from '../film-page/film-page';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute } from '../../const';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import PrivateRoute from '../../components/private-route/private-route';
import PlayerPage from '../player-page/player-page';
import NotFoundPage from '../not-found-page/not-found-page';
import AddReviewPage from '../add-review-page/add-review-page';
import { useAppSelector } from '../../hooks';
import { isCheckedAuth } from '../../utils';
import Spinner from '../../components/spinner/spinner';

function App(): JSX.Element {
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const {films, isFilmsLoaded} = useAppSelector(({GLOBAL_DATA}) => GLOBAL_DATA);
  const {promoFilm, isPromoFilmLoaded} = useAppSelector(({PROCESS}) => PROCESS);

  if (isCheckedAuth(authorizationStatus) || !isFilmsLoaded || !isPromoFilmLoaded) {
    return (
      <Spinner />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <MainPage
              films={films}
              promoFilm={promoFilm}
            />
          }
        />
        <Route
          path={AppRoute.Login}
          element={<SignInPage />}
        />
        <Route path={AppRoute.Film}>
          <Route index
            element={<FilmPage />}
          />
          <Route path=':id'
            element={<FilmPage />}
          />
          <Route path={`:id${AppRoute.AddReview}`}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <AddReviewPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path={AppRoute.MyList}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <MyListPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Player}>
          <Route index
            element={<PlayerPage />}
          />
          <Route path=':id'
            element={<PlayerPage />}
          />
        </Route>
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;

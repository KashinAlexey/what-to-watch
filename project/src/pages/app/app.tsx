import MainPage from '../main-page/main-page';
import browserHistory from '../../browser-history';
import SignInPage from '../sign-in-screen/sign-in-page';
import MyListPage from '../my-list-page/my-list-page';
import FilmPage from '../film-page/film-page';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import PrivateRoute from '../../components/private-route/private-route';
import PlayerPage from '../player-page/player-page';
import NotFoundPage from '../not-found-page/not-found-page';
import AddReviewPage from '../add-review-page/add-review-page';

type AppScreenProps = {
  filmsCount: number;
}

const authorizationStatus = AuthorizationStatus.Auth;

function App({filmsCount}: AppScreenProps): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <MainPage filmsCount={filmsCount} />
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

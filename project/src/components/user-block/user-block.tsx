import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAvatarUrl } from '../../services/avatar';
import { store } from '../../store';
import { logoutAction } from '../../store/api-actions';
import { isUserAuth } from '../../utils';

function UserBlock(): JSX.Element {
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const isAuth = isUserAuth(authorizationStatus);
  const avatarUrl = getAvatarUrl();
  const navigate = useNavigate();

  return (
    <ul className="user-block">
      {isAuth ?
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img
              src={avatarUrl}
              alt="User avatar"
              width="63"
              height="63"
              onClick={() => navigate(AppRoute.MyList)}
            />
          </div>
        </li> : ''}

      <li className="user-block__item">
        <Link
          to={isAuth ? '' : AppRoute.Login}
          className="user-block__link"
          onClick={() => {
            if (isAuth) {store.dispatch(logoutAction());}
          }}
        >
          {isAuth ? 'Sign out' : 'Sign in'}
        </Link>
      </li>
    </ul>
  );
}

export default UserBlock;

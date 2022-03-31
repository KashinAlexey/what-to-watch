import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Film } from '../../types/film';
import VideoPlayer from '../video-player/video-player';

type FilmCardSmallProps = {
  film: Film;
}

const DELAY = 500;

function FilmCardSmall(props: FilmCardSmallProps): JSX.Element {
  const {film} = props;
  const {id, name, previewImage} = film;
  const [isVideoActive, setIsVideoActive] = useState(false);
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const onMouseEnter = () => {
    timerId.current = setTimeout(() => {
      setIsVideoActive(true);
    }, DELAY);
  };

  const onMouseLeave = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      setIsVideoActive(false);
    }
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => navigate(`${AppRoute.Film}/${id}`)}
    >
      <div className="small-film-card__image">
        {isVideoActive ?
          <VideoPlayer
            film={film}
            isActive={isVideoActive}
          /> :
          <img
            src={previewImage}
            alt={name}
            width="280"
            height="175"
          />}
      </div>
      <h3 className="small-film-card__title">
        <Link
          to={`${AppRoute.Film}/${id}`}
          className="small-film-card__link"
        >
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCardSmall;

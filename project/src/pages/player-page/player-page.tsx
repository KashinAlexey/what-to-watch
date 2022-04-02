import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/loading/loading';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchFilmAction } from '../../store/api-actions';
import { resetAllFilmAction } from '../../store/app-local-data/app-local-data';

export const calculateDateDiff = (startDay=0, endDay=0) => {
  const dateDiff = Math.abs(startDay - endDay);
  let timeString;

  if (dateDiff < 60 ) {
    timeString = `${`0${Math.trunc(dateDiff / 60)}`.slice(-2)}:${`0${Math.trunc(dateDiff)}`.slice(-2)}`;
  } else {
    timeString = `${`0${Math.trunc(dateDiff / 60 / 60)}`.slice(-2)}:${`0${Math.trunc(dateDiff / 60)}`.slice(-2)}:${`0${Math.trunc(dateDiff)}`.slice(-2)}`;
  }

  return timeString;
};

function PlayerPage(): JSX.Element {
  const params = useParams();
  const {film, isFilmLoaded} = useAppSelector(({LOCAL_DATA}) => LOCAL_DATA);
  const {videoLink, previewImage, id} = film;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaing, setisPlaing] = useState(false);
  const [videoDuration, setVideoDuration] = useState(videoRef.current?.duration);
  const [progressVideo, setProgressVideo] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      store.dispatch(resetAllFilmAction());
      store.dispatch(fetchFilmAction(+params.id));
    }
  }, [params]);

  if (!isFilmLoaded) {
    return (
      <Loading />
    );
  }

  const togglePlay = () => {
    if (!videoRef.current) {
      return;
    }

    if (videoRef.current.paused) {
      videoRef.current.play();
      setisPlaing(true);
    } else {
      videoRef.current.pause();
      setisPlaing(false);
    }
  };

  const onExitClick = () => {
    if (!videoRef.current) {
      return;
    }

    if (isPlaing) {
      videoRef.current.pause();
      setisPlaing(false);
    }

    navigate(`${AppRoute.Film}/${id}`);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) {
      return;
    }

    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const onTimeUpdate = () => {
    if (!videoRef.current) {
      return;
    }

    setProgressVideo((videoRef.current.currentTime / videoRef.current.duration) * 100);
    setVideoDuration(videoRef.current.duration - videoRef.current.currentTime);
  };

  return (
    <div className="player">
      <video
        className="player__video"
        ref={videoRef}
        src={videoLink}
        poster={previewImage}
        onTimeUpdate={onTimeUpdate}
      />

      <button
        onClick={onExitClick}
        type="button"
        className="player__exit"
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: `${progressVideo}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{calculateDateDiff(0, videoDuration)}</div>
        </div>

        <div className="player__controls-row">
          <button
            onClick={togglePlay}
            type="button"
            className="player__play"
          >
            {isPlaing ?
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg>
              :
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>}

            <span>{isPlaing ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button
            onClick={toggleFullscreen}
            type="button"
            className="player__full-screen"
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;

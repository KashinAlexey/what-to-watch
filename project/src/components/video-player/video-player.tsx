import { useEffect, useRef } from 'react';
import { Film } from '../../types/film';

type VideoPlayerProps = {
  film: Film;
  isActive: boolean;
}

function VideoPlayer(props: VideoPlayerProps): JSX.Element {
  const {film, isActive} = props;
  const {previewVideoLink, previewImage} = film;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (isActive) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }

  }, [isActive]);

  return (
    <video
      ref={videoRef}
      src={previewVideoLink}
      poster={previewImage}
      width="100%"
      height="100%"
      muted
      hidden={!isActive}
    />
  );
}

export default VideoPlayer;

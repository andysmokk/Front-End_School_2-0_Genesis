import ReactPlayer from 'react-player';
import s from './VideoPlayer.module.css';

import { useState, useEffect, useRef } from 'react';

function VideoPlayer({ url, id }) {
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`lesson_${id}_progress`);
    if (savedProgress) {
      playerRef.current.seekTo(parseFloat(savedProgress));
    }
  }, [id]);

  const handleVideoProgress = state => {
    const { playedSeconds } = state;
    const progress = Math.round(playedSeconds);
    localStorage.setItem(`lesson_${id}_progress`, progress);
    setProgress(progress);
  };

  return (
    <div>
      <ReactPlayer
        className={s.reactPlayer}
        ref={playerRef}
        url={url}
        onProgress={handleVideoProgress}
        width="60%"
        height="60%"
        controls={true}
        // seekTo={progress}
        playing={true}
      />
      <p>Progress: {progress} seconds</p>
    </div>
  );
}

export default VideoPlayer;

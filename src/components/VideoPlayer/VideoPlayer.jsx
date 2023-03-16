import ReactPlayer from 'react-player';
import s from './VideoPlayer.module.css';

function VideoPlayer({ url }) {
  return (
    <div>
      <ReactPlayer
        className={s.reactPlayer}
        url={url}
        width="60%"
        height="60%"
        controls={true}
      />
    </div>
  );
}

export default VideoPlayer;

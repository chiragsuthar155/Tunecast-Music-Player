import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle
      size={35}
      className="text-orange-500 "
      onClick={handlePause}
      style={{ color: "white" }}
    />
  ) : (
    <FaPlayCircle size={35} className="text-orange-500 " onClick={handlePlay} />
  );

export default PlayPause;

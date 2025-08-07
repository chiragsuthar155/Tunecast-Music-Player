import { useParams } from "react-router-dom";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";
import { SkeletonSongDetail } from "../components";

import spotify from "../assets/spotify.png";
import youtube from "../assets/youtube.svg";
import shazam from "../assets/shazam.svg";
import apple from "../assets/apple.svg";
import deezer from "../assets/deezer.png";
import { Loader } from "../components";

const SongDetails = () => {
  const { songid } = useParams();
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error: songError,
  } = useGetSongDetailsQuery({ songid });

  const openNewTab = (url) => {
    console.log(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (isFetchingSongDetails) {
    return <SkeletonSongDetail />;
  }

  if (songError || !songData) return <div className="text-center text-black">Song not found</div>;

  return (
    <>
      <div className="mt-5">
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-start md:items-start px-4">
          <img
            src={songData?.images?.coverart || "https://via.placeholder.com/300x300"}
            alt={songData?.title || "Song"}
            className="rounded-full w-48 sm:w-56 md:w-64 lg:w-80 mb-10 md:mb-0 max-w-sm"
          />
          <div className="flex flex-col ml-0 px-4 md:px-8 md:ml-10 items-center md:items-start font-black w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-center md:text-left break-words">{songData?.title || "Unknown Title"}</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-center md:text-left">{songData?.subtitle || "Unknown Artist"}</p>
            <p className="text-base sm:text-lg md:text-xl text-center md:text-left">{songData?.genres?.primary || "Music"}</p>
            <div className="flex flex-row justify-start items-center">
              <img
                className="w-6 sm:w-7 md:w-9 mr-2 sm:mr-3 cursor-pointer mt-3 hover:scale-125 transition-transform"
                src={spotify}
                alt="Spotify Logo"
                onClick={() => {
                  openNewTab(songData?.hub?.providers?.[0]?.actions?.[0]?.uri || songData?.url || "#");
                }}
              />
              <img
                className="w-6 sm:w-7 md:w-10 mr-2 sm:mr-3 cursor-pointer mt-3 hover:scale-125 transition-transform"
                src={youtube}
                alt="Youtube Logo"
                onClick={() => {
                  openNewTab(songData?.sections?.[2]?.youtubeurl?.actions?.[0]?.uri || `https://www.youtube.com/results?search_query=${encodeURIComponent((songData?.title || '') + ' ' + (songData?.subtitle || ''))}`);
                }}
              />
              <img
                className="w-6 sm:w-7 md:w-10 mr-2 sm:mr-3 cursor-pointer mt-3 hover:scale-125 transition-transform"
                src={shazam}
                alt="Shazam Logo"
                onClick={() => {
                  openNewTab(songData?.url || "#");
                }}
              />
              <img
                className="w-6 sm:w-7 md:w-10 mr-2 sm:mr-3 cursor-pointer mt-3 hover:scale-125 transition-transform"
                src={apple}
                alt="Apple Logo"
                onClick={() => {
                  openNewTab(songData?.hub?.options?.[0]?.actions?.[1]?.uri || songData?.url || "#");
                }}
              />
              <img
                className="w-6 sm:w-7 md:w-10 mr-2 sm:mr-3 cursor-pointer mt-3 hover:scale-125 transition-transform"
                src={deezer}
                alt="Deezer Logo"
                onClick={() => {
                  openNewTab(songData?.url || "#");
                }}
              />
            </div>
            <div className="mt-9  w-full">
              <h1 className="mb-3 text-2xl sm:text-3xl md:text-4xl text-center md:text-left">Lyrics: </h1>
              {songData?.sections?.[1]?.type === "LYRICS" && songData?.sections?.[1]?.text ? (
                songData.sections[1].text.map((songLine, index) => (
                  <p key={index} className="text-sm sm:text-base md:text-xl font-normal leading-6 md:leading-8 text-center md:text-left">
                    {songLine}
                  </p>
                ))
              ) : (
                <p className="text-lg sm:text-xl font-normal text-center md:text-left">Not Available 😥</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SongDetails;

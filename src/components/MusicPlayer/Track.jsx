import React from "react";

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div
      className={`${
        isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
      } hidden sm:block h-12 w-12 sm:h-16 sm:w-16 mr-2 sm:mr-4`}
    >
      <img
        src={activeSong?.images?.coverart}
        alt="cover art"
        className="rounded-full"
      />
    </div>
    <div className="w-full text-center sm:text-left">
      <p className="w-24 sm:w-32 md:w-80 truncate text-white font-bold text-sm sm:text-lg">
        {activeSong?.title ? activeSong?.title : "No active Song"}
      </p>
      <p className="w-24 sm:w-32 md:w-80 truncate text-gray-300 text-xs sm:text-base">
        {activeSong?.subtitle ? activeSong?.subtitle : "No active Song"}
      </p>
    </div>
  </div>
);

export default Track;

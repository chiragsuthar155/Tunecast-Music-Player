import React from "react";
import { useGetAroundYouDetailsQuery } from "../redux/services/shazamCore";
import { SongCard, SkeletonCard } from "../components";
const CountryTracks = () => {
  const { data: aroundYouData, isFetching: isFetchingAroundYou } =
    useGetAroundYouDetailsQuery();
  console.log(aroundYouData);
  
  if (isFetchingAroundYou) {
    return (
      <div className="flex flex-wrap sm:justify-start justify-center gap-4 px-2">
        {[...Array(12)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }
  
  return (
    <>
      <div className="flex flex-wrap sm:justify-start justify-center gap-4 px-2">
        {aroundYouData?.tracks?.map((song, i) => (
          <SongCard key={song.key} song={song} data={aroundYouData} i={i} />
        ))}
      </div>
    </>
  );
};

export default CountryTracks;

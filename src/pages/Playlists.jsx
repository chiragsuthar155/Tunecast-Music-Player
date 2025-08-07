import React from "react";
import { useGetPlaylistsDetailsQuery } from "../redux/services/shazamCore";
import { SongCard, SkeletonCard } from "../components";

function Playlists() {
  const { data, isFetching: isFetchingPlaylistDetails } =
    useGetPlaylistsDetailsQuery();
  console.log(data);
  
  if (isFetchingPlaylistDetails) {
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
        {data?.tracks?.map((song, i) => (
          <SongCard key={song.key} song={song} data={data} i={i} />
        )) || <div className="text-center text-black">No playlists found</div>}
      </div>
    </>
  );
}

export default Playlists;

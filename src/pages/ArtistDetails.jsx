import React from "react";
import { useParams } from "react-router-dom";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
import { SongCard, SkeletonCard } from "../components";
import NotAvailable from "./NotAvailable";
const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { data: artistData, isFetching: isFetchingArtistData } =
    useGetArtistDetailsQuery({ artistId });
  
  if (isFetchingArtistData) {
    return (
      <div className="flex flex-wrap sm:justify-start justify-center gap-4 px-2">
        {[...Array(12)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }
  
  console.log("Artist Data", artistData);
  return (
    <>
      {artistData?.errors ? (
        <NotAvailable />
      ) : (
        <div className="flex flex-wrap sm:justify-start justify-center gap-4 px-2">
          {artistData?.resources?.songs && Object.values(artistData.resources.songs).map((song, i) => (
            <SongCard key={song.key} song={song} data={artistData} i={i} />
          )) || <div className="text-center text-black">No songs found</div>}
        </div>
      )}
    </>
  );
};

export default ArtistDetails;

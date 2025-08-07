import React from "react";
import { Link } from "react-router-dom";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { SkeletonArtist } from "../components";

const TopArtists = () => {
  const { data: artistsData, isFetching: isFetchingArtistsDetails } =
    useGetTopChartsQuery();

  if (isFetchingArtistsDetails) {
    return (
      <div className="flex flex-row w-full flex-wrap gap-5 py-8 justify-center md:justify-start px-2">
        {[...Array(12)].map((_, i) => (
          <SkeletonArtist key={i} />
        ))}
      </div>
    );
  }
  
  console.log(artistsData.tracks);
  return (
    <>
      <div
        id="artists"
        className="flex flex-row w-full flex-wrap gap-5 py-8 justify-center md:justify-start px-2"
      >
        {artistsData?.tracks?.map((item, i) => (
          <Link
            key={i}
            className="flex flex-col justify-center  items-center "
            to={`/artists/${
              item?.artists ? item?.artists[0].adamid : "not-available"
            }`}
          >
            <img
              src={
                item.share.avatar
                  || "https://via.placeholder.com/300x300"
              }
              alt="name"
              className="rounded-full object-cover w-32 sm:w-40 md:w-48 transition hover:-translate-y-2"
            />
            <p className="mt-1 font-bold text-gray-50 px-2 text-xs md:text-sm truncate max-w-full text-center bg-orange-400 rounded-lg py-1">
              {item?.subtitle}
            </p>
          </Link>
        )) || <div className="text-center text-black">No artists found</div>}
      </div>
    </>
  );
};

export default TopArtists;

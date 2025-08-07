import React from "react";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { SongCard, SkeletonCard } from "../components";
const TopCharts = () => {
  const { data: dataDiscover, isFetching: isFetchingDiscoveryDetails } =
    useGetTopChartsQuery();
  
  if (isFetchingDiscoveryDetails) {
    return (
      <div className="flex flex-wrap sm:justify-start justify-center gap-4 px-2">
        {[...Array(12)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }
  
  console.log(dataDiscover);
  return (
    <>
      <div className="flex flex-wrap sm:justify-start justify-center gap-4 px-2">
        {dataDiscover?.tracks?.map((song, i) => (
          <SongCard key={song.key} song={song} data={dataDiscover} i={i} />
        )) || <div className="text-center text-black">No charts found</div>}
      </div>
    </>
  );
};

export default TopCharts;

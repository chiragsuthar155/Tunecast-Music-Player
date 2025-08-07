import { useSelector } from "react-redux";
import { Loader, SongCard, SkeletonCard } from "../components";
import { useGetDiscoverQuery } from "../redux/services/shazamCore";

const Discover = () => {
  // const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetDiscoverQuery();

  if (isFetching) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-wrap sm:justify-start justify-center gap-4">
          {[...Array(12)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col ">
      <div className="flex flex-wrap sm:justify-start justify-center gap-4 px-2">
        {data.tracks.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;

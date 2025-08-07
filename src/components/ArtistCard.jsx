const ArtistCard = ({ track }) => {
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <img
        alt="artist"
        src={track?.images?.coverart || "https://via.placeholder.com/300x300"}
        className="w-full h-56 rounded-lg object-cover"
      />
      <p className="mt-4 font-semibold text-lg text-black truncate">
        {track?.title}
      </p>
      <p className="text-sm truncate text-gray-500 mt-1">
        {track?.subtitle}
      </p>
    </div>
  );
};

export default ArtistCard;

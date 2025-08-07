import React from 'react';

const SkeletonCard = () => (
  <div className="flex flex-col w-[250px] p-4 bg-white/10 backdrop-blur-sm animate-pulse rounded-lg">
    <div className="relative w-full h-54 bg-gray-300 rounded-xl mb-4"></div>
    <div className="h-4 bg-gray-300 rounded mb-2"></div>
    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
  </div>
);

const SkeletonArtist = () => (
  <div className="flex flex-col justify-center items-center animate-pulse">
    <div className="w-48 h-48 bg-gray-300 rounded-full mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-24"></div>
  </div>
);

const SkeletonSongDetail = () => (
  <div className="mt-5 animate-pulse">
    <div className="flex flex-col justify-center items-center md:flex-row md:justify-start md:items-start">
      <div className="w-3/6 md:w-1/4 h-64 md:h-80 bg-gray-300 rounded-full mb-10 md:mb-0"></div>
      <div className="flex flex-col ml-0 px-8 md:ml-10 items-start w-full">
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-6"></div>
        <div className="flex flex-row justify-start items-center mb-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-7 h-7 bg-gray-300 rounded mr-3"></div>
          ))}
        </div>
        <div className="w-full">
          <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SkeletonSearch = () => (
  <div>
    <div className="h-6 bg-gray-300 rounded w-48 mb-6 ml-5 md:ml-0"></div>
    <div className="flex flex-wrap sm:justify-start justify-center gap-4">
      {[...Array(8)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
    <div className="h-6 bg-gray-300 rounded w-32 mt-9 mb-6"></div>
    <div className="flex flex-row w-full flex-wrap gap-5 py-8 justify-center md:justify-start">
      {[...Array(6)].map((_, i) => (
        <SkeletonArtist key={i} />
      ))}
    </div>
  </div>
);

export { SkeletonCard, SkeletonArtist, SkeletonSongDetail, SkeletonSearch };
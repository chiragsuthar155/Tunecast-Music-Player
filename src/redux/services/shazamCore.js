import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper function to transform iTunes data to match our existing structure
const transformiTunesTrack = (track) => ({
  key: track.trackId?.toString() || Math.random().toString(),
  title: track.trackName || track.collectionName,
  subtitle: track.artistName,
  images: {
    coverart: track.artworkUrl100?.replace('100x100', '300x300') || track.artworkUrl60?.replace('60x60', '300x300'),
  },
  artists: [{
    adamid: track.artistId?.toString(),
    name: track.artistName,
  }],
  hub: {
    actions: [
      { uri: track.previewUrl },
      { uri: track.previewUrl }
    ],
    providers: [
      {
        actions: [
          { uri: track.trackViewUrl }
        ]
      }
    ],
    options: [
      {
        actions: [
          { uri: track.trackViewUrl },
          { uri: track.trackViewUrl }
        ]
      }
    ]
  },
  url: track.trackViewUrl,
  genres: {
    primary: track.primaryGenreName || 'Music'
  },
  sections: [
    {},
    { type: 'LYRICS', text: ['Lyrics not available for this track'] },
    {
      youtubeurl: {
        actions: [
          { uri: `https://www.youtube.com/results?search_query=${encodeURIComponent(track.trackName + ' ' + track.artistName)}` }
        ]
      }
    }
  ],
  share: {
    avatar: track.artworkUrl100?.replace('100x100', '300x300') || track.artworkUrl60?.replace('60x60', '300x300')
  }
});

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://itunes.apple.com",
  }),
  endpoints: (builder) => ({
    getSearchResults: builder.query({
      query: ({ searchTerm }) => `/search?term=${encodeURIComponent(searchTerm)}&media=music&entity=song&limit=20`,
      transformResponse: (response) => ({
        tracks: {
          hits: response.results.map(track => ({
            track: transformiTunesTrack(track)
          }))
        },
        artists: {
          hits: response.results
            .filter((item, index, self) => 
              index === self.findIndex(t => t.artistId === item.artistId)
            )
            .slice(0, 10)
            .map(artist => ({
              artist: {
                adamid: artist.artistId?.toString(),
                name: artist.artistName,
                avatar: artist.artworkUrl100?.replace('100x100', '300x300') || artist.artworkUrl60?.replace('60x60', '300x300')
              }
            }))
        }
      })
    }),
    getDiscover: builder.query({
      query: () => `/search?term=trending&media=music&entity=song&limit=20`,
      transformResponse: (response) => ({
        tracks: response.results.map(transformiTunesTrack)
      })
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/lookup?id=${songid}&entity=song`,
      transformResponse: (response) => {
        const track = response.results[0];
        return track ? transformiTunesTrack(track) : null;
      }
    }),
    getPlaylistsDetails: builder.query({
      query: () => `/search?term=playlist&media=music&entity=song&limit=20`,
      transformResponse: (response) => ({
        tracks: response.results.map(transformiTunesTrack)
      })
    }),
    getSearchTexts: builder.query({
      query: ({ debouncedValue }) => `/search?term=${encodeURIComponent(debouncedValue)}&media=music&entity=song&limit=5`,
      transformResponse: (response) => ({
        hints: response.results.slice(0, 5).map(track => ({
          term: `${track.trackName} ${track.artistName}`
        }))
      })
    }),
    getArtistDetails: builder.query({
      query: ({ artistId }) => `/lookup?id=${artistId}&entity=song&limit=20`,
      transformResponse: (response) => {
        if (response.results.length === 0) {
          return { errors: ['Artist not found'] };
        }
        return {
          resources: {
            songs: response.results.slice(1).reduce((acc, track, index) => {
              acc[index] = {
                ...transformiTunesTrack(track),
                attributes: {
                  name: track.trackName,
                  albumName: track.collectionName,
                  composerName: track.artistName,
                  artwork: {
                    url: track.artworkUrl100?.replace('100x100', '{w}x{h}bb.jpg') || track.artworkUrl60?.replace('60x60', '{w}x{h}bb.jpg')
                  }
                }
              };
              return acc;
            }, {})
          }
        };
      }
    }),
    getAroundYouDetails: builder.query({
      query: () => `/search?term=popular&media=music&entity=song&limit=20`,
      transformResponse: (response) => ({
        tracks: response.results.map(transformiTunesTrack)
      })
    }),
    getTopCharts: builder.query({
      query: () => `/search?term=top+hits&media=music&entity=song&limit=20`,
      transformResponse: (response) => ({
        tracks: response.results.map(transformiTunesTrack)
      })
    }),
  }),
});

export const {
  useGetSearchResultsQuery,
  useGetAroundYouDetailsQuery,
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetPlaylistsDetailsQuery,
  useGetSearchTextsQuery,
  useGetArtistDetailsQuery,
  useGetDiscoverQuery,
} = shazamCoreApi;
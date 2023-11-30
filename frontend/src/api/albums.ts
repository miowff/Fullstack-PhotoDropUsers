import {
  AlbumModel,
  AlbumWithPhotos,
} from "../../../backend/src/models/albums";
import { apiSlice } from "./api";

export const albumsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserAlbums: builder.query<AlbumModel[], void>({
      query: () => ({
        url: "albums",
        method: "GET",
      }),
    }),
    getAlbumWithPhotos: builder.query<AlbumWithPhotos, string>({
      query: (albumId) => ({
        url: `album?albumId=${albumId}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAllUserAlbumsQuery, useGetAlbumWithPhotosQuery } =
  albumsApi;

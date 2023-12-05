import {
  AlbumModel,
  AlbumWithPhotos,
} from "../../../backend/src/models/albums";
import { PaymentUrlResponse } from "../../../backend/src/models/payments";
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
    getAlbumInfo: builder.query<AlbumModel, string>({
      query: (albumId) => ({
        url: `album-info?albumId=${albumId}`,
        method: "GET",
      }),
    }),
    getPaymentUrl: builder.query<PaymentUrlResponse, string>({
      query: (albumId) => ({
        url: `activate?albumId=${albumId}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetAllUserAlbumsQuery,
  useGetAlbumWithPhotosQuery,
  useLazyGetPaymentUrlQuery,
  useGetAlbumInfoQuery,
} = albumsApi;

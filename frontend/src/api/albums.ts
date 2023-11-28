import { AlbumModel } from "../../../backend/src/models/albums";
import { apiSlice } from "./api";

export const albumsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserAlbums: builder.query<AlbumModel[], void>({
      query: () => ({
        url: "albums",
        method: "GET",
      }),
    }),
  }),
});
export const {  useGetAllUserAlbumsQuery } =
  albumsApi;

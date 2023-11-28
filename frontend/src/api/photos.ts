import { PhotoResponse } from "../../../backend/src/models/photo";
import { apiSlice } from "./api";

export const photosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserPhotos: builder.query<PhotoResponse[], void>({
      query: () => ({
        url: "photos",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAllUserPhotosQuery } = photosApi;

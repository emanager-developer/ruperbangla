import { apiSlice } from "../api/apiSlice";

export const faviconApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavicons: builder.query({
      query: () => ({
        url: "/favicon/all",
      }),
      providesTags: ["favicon"],
    }),

    addFavicon: builder.mutation({
      query: (formData) => ({
        url: `/favicon/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["favicon"],
    }),

    updateFavicon: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/favicon/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["favicon"],
    }),
  }),
});

export const {
  useGetFaviconsQuery,
  useAddFaviconMutation,
  useUpdateFaviconMutation,
} = faviconApi;

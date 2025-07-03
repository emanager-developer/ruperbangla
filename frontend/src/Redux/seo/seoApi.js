import { apiSlice } from "../api/apiSlice";

export const seoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSEO: builder.query({
      query: () => ({
        url: "/seo", 
      }),
      providesTags: ["seo"],
    }),

    addSEO: builder.mutation({
      query: (seoData) => ({
        url: `/seo/add`,
        method: "POST",
        body: seoData,
      }),
      invalidatesTags: ["seo"],
    }),

    updateSEO: builder.mutation({
      query: ({ id, seoData }) => ({
        url: `/seo/update/${id}`,
        method: "PATCH",
        body: seoData,
      }),
      invalidatesTags: ["seo"],
    }),
  }),
});

export const {
  useGetSEOQuery,
  useAddSEOMutation,
  useUpdateSEOMutation,
} = seoApi;

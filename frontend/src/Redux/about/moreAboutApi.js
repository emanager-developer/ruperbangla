import { apiSlice } from "../api/apiSlice";

export const moreAboutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMoreAbout: builder.query({
      query: () => ({
        url: "/moreAbout",
      }),
      providesTags: ["moreAbout"],
    }),

    updateMoreAbout: builder.mutation({
      query: ({ id, data }) => ({
        url: `/moreAbout/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["moreAbout"],
    }),

    addMoreAbout: builder.mutation({
      query: (data) => ({
        url: `/moreAbout/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["moreAbout"],
    }),

    getSingleMoreAbout: builder.query({
      query: (id) => ({
        url: `/moreAbout/${id}`,
      }),
      providesTags: ["moreAbout"],
    }),

    getMoreAboutBySlug: builder.query({
      query: (slug) => ({
        url: `/moreAbout/slug/${slug}`,
      }),
      providesTags: ["moreAbout"],
    }),

    deleteMoreAbout: builder.mutation({
      query: (id) => ({
        url: `/moreAbout/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["moreAbout"],
    }),
  }),
});

export const {
  useGetMoreAboutQuery,
  useAddMoreAboutMutation,
  useUpdateMoreAboutMutation,
  useGetSingleMoreAboutQuery,
  useDeleteMoreAboutMutation,
  useGetMoreAboutBySlugQuery,
} = moreAboutApi;

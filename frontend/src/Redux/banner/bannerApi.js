import { apiSlice } from "../api/apiSlice";

export const bannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanner: builder.query({
      query: () => ({
        url: "/banner/all",
      }),
      providesTags: ["banner"],
    }),

    getSingleBanner: builder.query({
      query: (id) => ({
        url: `/banner/${id}`,
      }),
      providesTags: ["banner"],
    }),

    addBanner: builder.mutation({
      query: (formData) => ({
        url: `/banner/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["banner"],
    }),

    updateBanner: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/banner/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["banner"],
    }),

    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetAllBannerQuery,
  useGetSingleBannerQuery,
  useAddBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;

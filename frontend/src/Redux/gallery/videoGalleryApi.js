import { apiSlice } from "../api/apiSlice";

export const videoGalleryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideoGallery: builder.query({
      query: () => ({
        url: "/videoGallery",
      }),
      providesTags: ["videoGallery"],
    }),

    getVideoGalleryById: builder.query({
      query: (id) => ({
        url: `/videoGallery/${id}`,
      }),
      providesTags: ["videoGallery"],
    }),

    addVideoGallery: builder.mutation({
      query: (formData) => ({
        url: `/videoGallery/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["videoGallery"],
    }),

    updateVideoGallery: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videoGallery/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["videoGallery"],
    }),

    deleteVideoGallery: builder.mutation({
      query: (id) => ({
        url: `/videoGallery/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["videoGallery"],
    }),
  }),
});

export const {
  useGetVideoGalleryQuery,
  useAddVideoGalleryMutation,
  useDeleteVideoGalleryMutation,
  useGetVideoGalleryByIdQuery,
  useUpdateVideoGalleryMutation,
} = videoGalleryApi;

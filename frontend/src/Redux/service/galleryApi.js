import { apiSlice } from "../api/apiSlice";

export const galleryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGallery: builder.query({
      query: () => ({
        url: "/gallery/all",
      }),
      providesTags: ["gallery"],
    }),

    getSingleGallery: builder.query({
      query: (id) => ({
        url: `/gallery/${id}`,
      }),
      providesTags: ["gallery"],
    }),

    addGallery: builder.mutation({
      query: (formData) => ({
        url: `/gallery/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["gallery"],
    }),

    updateGallery: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/gallery/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["gallery"],
    }),

    DeleteGalleryById: builder.mutation({
      query: (id) => ({
        url: `/gallery/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["gallery"],
    }),

    // get by service id
    getGalleryByServiceId: builder.query({
      query: (id) => ({
        url: `/gallery/byservice/${id}`,
      }),
      providesTags: ["gallery"],
    }),
  }),
});

export const {
  useGetGalleryQuery,
  useAddGalleryMutation,
  useDeleteGalleryByIdMutation,
  useGetSingleGalleryQuery,
  useUpdateGalleryMutation,
  useGetGalleryByServiceIdQuery,
} = galleryApi;

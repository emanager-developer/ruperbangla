import { apiSlice } from "../api/apiSlice";

export const directorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDirector: builder.query({
      query: () => ({
        url: "/director",
      }),
      providesTags: ["director"],
    }),

    getDirectorById: builder.query({
      query: (id) => ({
        url: `/director/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "director", id }],
    }),

    createDirector: builder.mutation({
      query: (formData) => ({
        url: `/director/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["director"],
    }),

    updateDirector: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/director/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "director", id }],
    }),

    deleteDirector: builder.mutation({
      query: (id) => ({
        url: `/director/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["director"],
    }),
  }),
});

export const {
  useGetDirectorQuery,
  useGetDirectorByIdQuery,
  useCreateDirectorMutation,
  useUpdateDirectorMutation,
  useDeleteDirectorMutation,
} = directorApi;

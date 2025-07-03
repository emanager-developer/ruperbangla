import { apiSlice } from "../api/apiSlice";

export const highlightProjectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHighlightProject: builder.query({
      query: () => ({
        url: "/highlightProject",
      }),
      providesTags: ["highlightProject"],
    }),

    createHighlightProject: builder.mutation({
      query: (formData) => ({
        url: `/highlightProject/add-project`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["highlightProject"],
    }),

    updateHighlightProject: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/highlightProject/update-project/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["highlightProject"],
    }),
  }),
});

export const {
  useGetHighlightProjectQuery,
  useCreateHighlightProjectMutation,
  useUpdateHighlightProjectMutation,
} = highlightProjectApi;
import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["projects"],
    }),

    getRecentProjects: builder.query({
      query: () => ({
        url: "/projects/recent",
        method: "GET",
      }),
      providesTags: ["projects"],
    }),

    getProjectById: builder.query({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "GET",
      }),
      providesTags: ["projects"],
    }),

    addProject: builder.mutation({
      query: (formData) => ({
        url: "/projects/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["projects"],
    }),

    updateProject: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/projects/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["projects"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetRecentProjectsQuery,
  useGetProjectByIdQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;

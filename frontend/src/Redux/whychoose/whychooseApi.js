import { apiSlice } from "../api/apiSlice";

export const whychooseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWhychoose: builder.query({
      query: () => ({
        url: "/whychoose",
      }),
      providesTags: ["whychoose"],
    }),

    createWhychoose: builder.mutation({
      query: (formData) => ({
        url: `/whychoose/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["whychoose"],
    }),

    DeleteWhychooseById: builder.mutation({
      query: (id) => ({
        url: `/whychoose/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["whychoose"],
    }),

    GetWhychooseById: builder.query({
      query: (id) => ({
        url: `/whychoose/${id}`,
      }),
      providesTags: ["whychoose"],
    }),
  }),
});

export const {
  useGetWhychooseQuery,
  useCreateWhychooseMutation,
  useDeleteWhychooseByIdMutation,
  useGetWhychooseByIdQuery,
} = whychooseApi;

import { apiSlice } from "../api/apiSlice";

export const whychooseSectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWhychooseSection: builder.query({
      query: () => ({
        url: "/whychooseSection",
      }),
      providesTags: ["whychooseSection"],
    }),
    updateWhychooseSection: builder.mutation({
      query: ({ id, info }) => ({
        url: `/whychooseSection/update-whychooseSection/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["whychooseSection"],
    }),
    addWhychooseSection: builder.mutation({
      query: (info) => ({
        url: `/whychooseSection/add-whychooseSection`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["whychooseSection"],
    }),
  }),
});

export const {
  useGetWhychooseSectionQuery,
  useUpdateWhychooseSectionMutation,
  useAddWhychooseSectionMutation,
} = whychooseSectionApi;

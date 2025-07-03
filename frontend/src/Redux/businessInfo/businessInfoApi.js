import { apiSlice } from "../api/apiSlice";

export const businessInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessInfo: builder.query({
      query: () => ({
        url: "/businessInfo/get",
      }),
      providesTags: ["businessInfo"],
    }),

    addBusinessInfo: builder.mutation({
      query: (info) => ({
        url: "/businessInfo/add",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["businessInfo"],
    }),

    updateBusinessInfo: builder.mutation({
      query: ({ id, info }) => ({
        url: `/businessInfo/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["businessInfo"],
    }),
  }),
});

export const {
  useGetBusinessInfoQuery,
  useAddBusinessInfoMutation,
  useUpdateBusinessInfoMutation,
} = businessInfoApi;

import { apiSlice } from "../api/apiSlice";

export const logoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogos: builder.query({
      query: () => ({
        url: "/logo/all",
      }),
      providesTags: ["logo"],
    }),

    addLogo: builder.mutation({
      query: (formData) => ({
        url: `/logo/add-logo`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["logo"],
    }),

    updateLogo: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/logo/update-logo/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["logo"],
    }),
  }),
});

export const { 
  useGetLogosQuery, 
  useAddLogoMutation, 
  useUpdateLogoMutation 
} = logoApi;

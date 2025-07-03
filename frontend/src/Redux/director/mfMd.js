import { apiSlice } from "../api/apiSlice";

export const msMd = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMFMd: builder.query({
      query: () => ({
        url: "/mfMd",
      }),
      providesTags: ["mfMd"],
    }),

    addMFMd: builder.mutation({
      query: (formData) => ({
        url: `/mfMd/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["mfMd"],
    }),

    updateMFMd: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/mfMd/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["mfMd"],
    }),
  }),
});

export const { useGetMFMdQuery, useAddMFMdMutation, useUpdateMFMdMutation } =
  msMd;

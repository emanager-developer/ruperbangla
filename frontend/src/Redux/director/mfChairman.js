import { apiSlice } from "../api/apiSlice";

export const msChairman = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMFChairman: builder.query({
      query: () => ({
        url: "/mfChairman",
      }),
      providesTags: ["mfChairman"],
    }),

    addMFChairman: builder.mutation({
      query: (formData) => ({
        url: `/mfChairman/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["mfChairman"],
    }),

    updateMFChairman: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/mfChairman/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["mfChairman"],
    }),
  }),
});

export const {
  useGetMFChairmanQuery,
  useAddMFChairmanMutation,
  useUpdateMFChairmanMutation,
} = msChairman;

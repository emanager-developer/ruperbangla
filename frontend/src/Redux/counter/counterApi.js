import { apiSlice } from "../api/apiSlice";

export const counterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCounter: builder.query({
      query: () => ({
        url: "/counter/all",
      }),
      providesTags: ["counter"],
    }),

    addCounter: builder.mutation({
      query: (formData) => ({
        url: `/counter/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["counter"],
    }),

    updateCounter: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/counter/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["counter"],
    }),
  }),
});

export const {
  useGetCounterQuery,
  useAddCounterMutation,
  useUpdateCounterMutation,
} = counterApi;

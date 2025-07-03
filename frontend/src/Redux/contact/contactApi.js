import { apiSlice } from "../api/apiSlice";

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: "/contact",
      }),
      providesTags: ["contact"],
    }),
    updateContact: builder.mutation({
      query: ({ id, info }) => ({
        url: `/contact/update-contact/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["contact"],
    }),
    addContact: builder.mutation({
      query: (info) => ({
        url: `/contact/add-contact`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useUpdateContactMutation,
  useAddContactMutation,
} = contactApi;

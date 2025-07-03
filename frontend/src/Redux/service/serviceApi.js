import { apiSlice } from "../api/apiSlice";

export const serviceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllService: builder.query({
      query: () => ({
        url: "/service/all",
        method: "GET",
      }),
      providesTags: ["service"],
    }),

    getSingleService: builder.query({
      query: (id) => ({
        url: `/service/${id}`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),

    addService: builder.mutation({
      query: (formData) => ({
        url: "/service/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["service"],
    }),

    updateService: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/service/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["service"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/service/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useGetAllServiceQuery,
  useGetSingleServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;

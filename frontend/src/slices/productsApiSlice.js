import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 5,
    }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body: data,
      }),
      headers: {
        "Content-Type": "multipart/form-data", // For FormData
      },
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `${PRODUCTS_URL}/${id}`, // Use id from argument
          method: "PUT",
          body: data,
        };
      },
      headers: {
        "Content-Type": "multipart/form-data", // For FormData
      },
      invalidatesTags: ["Products", "Product"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;

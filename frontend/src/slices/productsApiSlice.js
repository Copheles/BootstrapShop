import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        keyword,
        pageNumber,
        rating,
        brands,
        category,
        sort,
        price,
      }) => {
        const params = {
          keyword,
          pageNumber,
          rating,
          brand: brands,
          category,
          sort,
        };

        // Add price[gte] parameter if price is provided and greater than or equal to 90
        if (price) {
          params["price[gte]"] = 0;
          params["price[lte]"] = parseInt(price);
        }

        return {
          url: PRODUCTS_URL,
          params,
        };
      },
      providesTags: ["Products"],
      keepUnusedDataFor: 60,
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
    imageUpload: builder.mutation({
      query: ({ data, id }) => ({
        url: `${PRODUCTS_URL}/image/upload/${id}`,
        method: "PUT",
        body: data,
      }),
      headers: {
        "Content-Type": "multipart/form-data", // For FormData
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `${PRODUCTS_URL}/${id}`, // Use id from argument
          method: "PUT",
          body: data,
        };
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
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
    getBrandsAndCategories: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/brandsAndCategories`,
      }),
      keepUnusedDataFor: 20,
    }),
    getFeaturedProduct: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/getFeaturedProduct`,
      }),
      keepUnusedDataFor: 60,
    }),
    getProductMaxPrice: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/getMaxPrice`,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useImageUploadMutation,
  useGetBrandsAndCategoriesQuery,
  useGetFeaturedProductQuery,
  useGetProductMaxPriceQuery
} = productApiSlice;

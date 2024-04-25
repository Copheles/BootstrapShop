import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    creaetOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
      invalidatesTags: ["UserNoti"],
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
      invalidatesTags: ["Orders", "UserNoti", "OrderDetails", "Notifications"],
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: ({ pageNumber }) => ({
        url: `${ORDERS_URL}/mine`,
        params: {
          pageNumber,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: ({ pageNumber }) => ({
        url: ORDERS_URL,
        params: {
          pageNumber,
        },
      }),
      providesTags: ["Orders"],
      keepUnusedDataFor: 60,
    }),
    deliveredOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications", "UserNoti", "OrderDetails"],
    }),
  }),
});

export const {
  useCreaetOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliveredOrderMutation,
} = orderApiSlice;

import { apiSlice } from "./apiSlice";
import { NOTIFICATION_URL } from "./../constants";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserNotification: builder.query({
      query: (id) => ({
        url: `${NOTIFICATION_URL}/${id}`,
      }),
      providesTags: ["Notifications"],
      keepUnusedDataFor: 60,
    }),
    updateNotiToRead: builder.mutation({
      query: (id) => ({
        url: `${NOTIFICATION_URL}/read/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"]
    }),
  }),
});

export const { useGetUserNotificationQuery, useUpdateNotiToReadMutation } = notificationApiSlice;

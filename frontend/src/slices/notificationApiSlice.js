import { apiSlice } from "./apiSlice";
import { NOTIFICATION_URL } from "./../constants";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserNotification: builder.query({
      query: ({ pageNumber, userId }) => ({
        url: `${NOTIFICATION_URL}/${userId}`,
        params: {
          pageNumber,
        },
      }),
      providesTags: ["Notifications"],
    }),
    updateNotiToRead: builder.mutation({
      query: (id) => ({
        url: `${NOTIFICATION_URL}/read/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const { useGetUserNotificationQuery, useUpdateNotiToReadMutation } =
  notificationApiSlice;

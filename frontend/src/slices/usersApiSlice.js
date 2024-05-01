import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: USERS_URL + "/auth",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: USERS_URL + "/logout",
        method: "POST",
      }),
      invalidatesTags: ['User']
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['User', 'Notifications', 'UserNoti']
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
      }),
      providesTags: ['User']
    }),
    getUsers: builder.query({
      query: ({ pageNumber }) => ({
        url: USERS_URL,
        params: {
          pageNumber
        }
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 5
    }),
    getUserNotiCount: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/notiCount/${id}`
      }),
      providesTags: ['UserNoti']
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE"
      }),
      invalidatesTags: ['Users']
    }),
    getUserDetails: builder.query({
      query:(userId) => ({
        url: `${USERS_URL}/${userId}`
      }),
      keepUnusedDataFor: 5
    }),
    updateUser: builder.mutation({
      query: ( data ) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ['Users']
    })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useGetProfileQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useGetUserNotiCountQuery
} = usersApiSlice;

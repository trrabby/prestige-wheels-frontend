/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { ICars } from "@/types/cars.type";
import { TQueryParam } from "@/types/global";

const UsersManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        // console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["users"],
      transformResponse: (response: any) => {
        return {
          data: response?.data?.result as ICars[],
          meta: response?.data?.meta,
        };
      },
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/users/deleteUser/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),

    updateUser: builder.mutation({
      query: ({ id, updatedData }: { id: string; updatedData: any }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = UsersManagementApi;

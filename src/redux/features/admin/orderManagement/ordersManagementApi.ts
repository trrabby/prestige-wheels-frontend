/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam } from "@/types/global";
import { IOrders } from "@/types/orders.type";

const ordersManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllorders: builder.query({
      query: (args) => {
        // console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/orders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["orders"],
      transformResponse: (response: any) => {
        return {
          data: response?.data?.result as IOrders[],
          meta: response?.data?.meta,
        };
      },
    }),

    // addCar: builder.mutation({
    //   query: (data) => ({
    //     url: "/cars/create-car",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["cars"],
    // }),

    // deleteCar: builder.mutation({
    //   query: (id: string) => ({
    //     url: `/cars/delete-car/${id}`,
    //     method: "PUT",
    //     body: { isDeleted: true },
    //   }),
    //   invalidatesTags: ["cars"],
    // }),

    // updateCar: builder.mutation({
    //   query: ({ id, updatedData }: { id: string; updatedData: FormData }) => ({
    //     url: `/cars/${id}`,
    //     method: "PATCH",
    //     body: updatedData,
    //   }),
    //   invalidatesTags: ["cars"],
    // }),
  }),
});

export const { useGetAllordersQuery } = ordersManagementApi;

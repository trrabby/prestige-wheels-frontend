/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam } from "@/types/global";
import { IOrders } from "@/types/orders.type";

const paymentManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
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
  }),
});

export const { useGetAllOrdersQuery } = paymentManagementApi;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const paymentManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllOrders: builder.query({
    //   query: (args) => {
    //     // console.log(args);
    //     const params = new URLSearchParams();

    //     if (args) {
    //       args.forEach((item: TQueryParam) => {
    //         params.append(item.name, item.value as string);
    //       });
    //     }

    //     return {
    //       url: "/orders",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   providesTags: ["orders"],
    //   transformResponse: (response: any) => {
    //     return {
    //       data: response?.data?.result as IOrders[],
    //       meta: response?.data?.meta,
    //     };
    //   },
    // }),

    createPayment: builder.mutation({
      query: (data) => ({
        url: "/payments/init",
        method: "POST",
        body: data,
      }),
    }),

    // updateOrder: builder.mutation({
    //   query: ({ id, payload }: { id: string; payload: Partial<IOrders> }) => ({
    //     url: `/orders/${id}`,
    //     method: "PATCH",
    //     body: payload,
    //   }),
    //   invalidatesTags: ["orders", "my_orders"],
    // }),

    // getMyOrders: builder.query({
    //   query: (args) => {
    //     // console.log(args);
    //     const params = new URLSearchParams();

    //     if (args) {
    //       args.forEach((item: TQueryParam) => {
    //         params.append(item.name, item.value as string);
    //       });
    //     }

    //     return {
    //       url: "orders/my-orders",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   providesTags: ["my_orders"],
    //   transformResponse: (response: any) => {
    //     return {
    //       data: response?.data?.result as IOrders[],
    //       meta: response?.data?.meta,
    //     };
    //   },
    // }),
  }),
});

export const { useCreatePaymentMutation } = paymentManagementApi;

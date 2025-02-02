/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { ICars } from "@/types/cars.type";
import { TQueryParam } from "@/types/global";

const productsManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        // console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/cars",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response?.data?.result as ICars[],
          meta: response?.data?.meta,
        };
      },
    }),

    addCar: builder.mutation({
      query: (data) => ({
        url: "/cars/create-car",
        method: "POST",
        body: data,
      }),
    }),

    deleteCar: builder.mutation({
      query: (id: string) => ({
        url: `/cars/delete-car/${id}`,
        method: "PUT",
        body: { isDeleted: true },
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddCarMutation,
  useDeleteCarMutation,
} = productsManagementApi;

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { RootState } from "../store";
import { config } from "@/config";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: config().URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }
    // console.log(token);

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);

  if (result?.error?.status === 400) {
    toast.error((result.error.data as any).message);
  }
  if (result?.error?.status === 404) {
    toast.error((result.error.data as any).message);
  }
  if (result?.error?.status === 403) {
    toast.error((result.error.data as any).message);
  }
  if (result?.error?.status === 401) {
    //* Send Refresh
    console.log("Sending refresh token");

    const res = await fetch(`${config().URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    // console.log(data.data.refreshedAccessToken);

    if (data?.data?.refreshedAccessToken) {
      const user = (api.getState() as RootState).auth.user;
      // console.log(user);
      api.dispatch(
        setUser({
          user,
          token: data.data.refreshedAccessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["users", "cars", "orders", "my_orders"],
  endpoints: () => ({}),
});

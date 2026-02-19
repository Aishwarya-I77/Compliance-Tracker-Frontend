import { baseApi } from "@/store/baseApi";
import { ApiResponse } from "@/types/common";
import { LoginRequest, LoginResponse } from "@/types/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ApiResponse<LoginResponse>) => response.data,
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation } = authApi;

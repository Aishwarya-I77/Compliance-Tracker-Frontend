import { baseApi } from "@/store/baseApi";
import { DashboardSummary } from "@/features/auth/dashboard/types";
import { ApiResponse } from "@/types/common";

const FALLBACK_SUMMARY: DashboardSummary = {
  totalRegistrations: 1240,
  totalComplied: 850,
  totalNotComplied: 120,
  notApplicable: 10,
};

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<DashboardSummary, void>({
      async queryFn(_arg, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({ url: "/dashboard/summary" });
        if (result.error) {
          return { data: FALLBACK_SUMMARY };
        }

        const response = result.data as ApiResponse<DashboardSummary>;
        return { data: response?.data ?? FALLBACK_SUMMARY };
      },
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardSummaryQuery } = dashboardApi;

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import dashboardService from "../services/dashboardService";

const DASHBOARD_KEY = ["dashboard"];

/* -------------------------- */
/* ADMIN DASHBOARD */
/* -------------------------- */

export function
useAdminDashboard(){

  return useQuery({

      queryKey:[
          ...DASHBOARD_KEY,
          "admin",
      ],

      queryFn:
          dashboardService
              .getAdminDashboard,

  });

}

/* -------------------------- */
/* PROVIDER DASHBOARD */
/* -------------------------- */

export function useProviderDashboard() {
  return useQuery({
    queryKey: [...DASHBOARD_KEY, "provider"],
    queryFn: dashboardService.getProviderDashboard,
    staleTime: 1000 * 60 * 5,
  });
}

/* -------------------------- */
/* CUSTOMER DASHBOARD */
/* -------------------------- */

export function useCustomerDashboard() {
  return useQuery({
    queryKey: [...DASHBOARD_KEY, "customer"],
    queryFn: dashboardService.getCustomerDashboard,
    staleTime: 1000 * 60 * 5,
  });
}

/* -------------------------- */
/* REVENUE ANALYTICS */
/* -------------------------- */

export function
useRevenueAnalytics(

    period="monthly",

    role="customer"

){

    return useQuery({

        queryKey:[

            ...DASHBOARD_KEY,

            "revenue",

            role,

            period,

        ],

        queryFn:()=>{

            if(role==="admin"){

                return dashboardService
                    .getAdminRevenueAnalytics(
                        period
                    );

            }

            if(role==="provider"){

                return dashboardService
                    .getProviderRevenueAnalytics(
                        period
                    );

            }

            return dashboardService
                    .getRevenueAnalytics(
                        period
                    );

        },

    });

}



export function
useProviderRevenueAnalytics(

    period="monthly"

){

    return useQuery({

        queryKey:[

            ...DASHBOARD_KEY,

            "providerRevenue",

            period,

        ],

        queryFn:()=>

            dashboardService
                .getProviderRevenueAnalytics(
                    period
                ),

    });

}
/* -------------------------- */
/* BOOKING ANALYTICS */
/* -------------------------- */

export function useBookingAnalytics(

  period="monthly",

  role="customer"

){

  return useQuery({

    queryKey:[

      ...DASHBOARD_KEY,

      "bookings",

      role,

      period,

    ],

    queryFn:()=>{

      if(role==="admin"){

        return dashboardService
          .getAdminBookingAnalytics(
            period
          );

      }

      if(role==="provider"){

        return dashboardService
          .getProviderBookingAnalytics(
            period
          );

      }

      return dashboardService
        .getBookingAnalytics(
          period
        );

    },

  });

}

export function
useProviderRecentJobs(){

  return useQuery({

    queryKey:[
      ...DASHBOARD_KEY,
      "providerRecentJobs",
    ],

    queryFn:
      dashboardService
        .getProviderRecentJobs,

  });

}

/* -------------------------- */
/* KPI STATS */
/* -------------------------- */

export function useDashboardStats() {
  return useQuery({
    queryKey: [
      ...DASHBOARD_KEY,
      "stats",
    ],
    queryFn: dashboardService.getStats,
    staleTime: 1000 * 60 * 2,
  });
}

/* -------------------------- */
/* ACTIVITIES */
/* -------------------------- */

export function useActivities(
  page = 0,
  size = 10
) {
  return useQuery({
    queryKey: [
      ...DASHBOARD_KEY,
      "activities",
      page,
      size,
    ],
    queryFn: () =>
      dashboardService.getActivities(
        page,
        size
      ),
  });
}

/* -------------------------- */
/* USERS */
/* -------------------------- */

export function useUsers(
  page = 0,
  size = 10
) {
  return useQuery({
    queryKey: [
      ...DASHBOARD_KEY,
      "users",
      page,
      size,
    ],
    queryFn: () =>
      dashboardService.getUsers(
        page,
        size
      ),
    staleTime: 1000 * 60 * 2,
  });
}

/* -------------------------- */
/* REPORTS */
/* -------------------------- */

export function useReports(
  params = {}
) {
  return useQuery({
    queryKey: [
      ...DASHBOARD_KEY,
      "reports",
      params,
    ],
    queryFn: () =>
      dashboardService.getReports(
        params
      ),
    staleTime: 1000 * 60 * 5,
  });
}

/* -------------------------- */
/* EXPORT REPORT */
/* -------------------------- */

export function useExportReport() {

  return useMutation({

    mutationFn: ({
      reportType,
      format
    }) =>
      dashboardService.exportReport(
        reportType,
        format
      ),

  });

}

/* -------------------------- */
/* COMPLAINTS */
/* -------------------------- */

export function useComplaints(
  params = {}
) {
  return useQuery({
    queryKey: [
      ...DASHBOARD_KEY,
      "complaints",
      params,
    ],
    queryFn: () =>
      dashboardService.getComplaints(
        params
      ),
    staleTime: 1000 * 60 * 2,
  });
}

/* -------------------------- */
/* CLOSE COMPLAINT */
/* -------------------------- */

export function useCloseComplaint() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      (complaintId) =>
        dashboardService
          .closeComplaint(
            complaintId
          ),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey:
          DASHBOARD_KEY,
      });

    },

  });

}

/* -------------------------- */
/* RESOLVE COMPLAINT */
/* -------------------------- */

export function useResolveComplaint() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      (complaintId) =>
        dashboardService
          .resolveComplaint(
            complaintId
          ),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey:
          DASHBOARD_KEY,
      });

    },

  });

}

/* -------------------------- */
/* TOP PROVIDERS */
/* -------------------------- */

export function useTopProviders() {
  return useQuery({
    queryKey: [
      ...DASHBOARD_KEY,
      "topProviders",
    ],
    queryFn:
      dashboardService.getTopProviders,
  });
}

/* -------------------------- */
/* RECENT BOOKINGS */
/* -------------------------- */

export function useRecentBookings() {
  return useQuery({
    queryKey: [
      ...DASHBOARD_KEY,
      "recentBookings",
    ],
    queryFn:
      dashboardService.getRecentBookings,
  });
}

/* -------------------------- */
/* TOGGLE USER STATUS */
/* -------------------------- */

export function useToggleUserStatus() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      userId,
      enabled,
    }) =>

      dashboardService
        .toggleUserStatus(
          userId,
          enabled
        ),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey:
          DASHBOARD_KEY,
      });

    },

  });

}

/* -------------------------- */
/* REFRESH DASHBOARD */
/* -------------------------- */

export function useRefreshDashboard() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      async () => true,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey:
          DASHBOARD_KEY,
      });

    },

  });

}
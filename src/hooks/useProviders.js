import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  FaUsers,
  FaSearch,
  FaUser,
  FaUserEdit,
  FaCalendarCheck,
  FaTools,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import providerService from "../services/providerService";
import { getAllProviders } from "../services/adminProviderService";

/* -------------------------------- */
/* QUERY KEY */
/* -------------------------------- */

const PROVIDERS_KEY = ["providers"];

/* -------------------------------- */
/* ICON MAP */
/* -------------------------------- */

export const PROVIDER_ICONS = {

  providers:
    FaUsers,

  search:
    FaSearch,

  single:
    FaUser,

  profile:
    FaUserEdit,

  availability:
    FaCalendarCheck,

  services:
    FaTools,

  reviews:
    FaStar,

  approve:
    FaCheckCircle,

  reject:
    FaTimesCircle,

};

/* -------------------------------- */
/* ALL PROVIDERS */
/* -------------------------------- */

export function useProviders(
  params = {}
) {

  return useQuery({

    queryKey: [
      ...PROVIDERS_KEY,
      params,
    ],

    queryFn: () =>
      providerService.getAll(
        params
      ),

    staleTime:
      1000 * 60 * 5,

  });

}

/* -------------------------------- */
/* SEARCH PROVIDERS */
/* -------------------------------- */

export function useSearchProviders(
  query
) {

  return useQuery({

    queryKey: [
      ...PROVIDERS_KEY,
      "search",
      query,
    ],

    queryFn: () =>
      providerService.search(
        query
      ),

    enabled:
      !!query,

  });

}

/* -------------------------------- */
/* SINGLE PROVIDER */
/* -------------------------------- */

export function useProvider(
  id
) {

  return useQuery({

    queryKey: [
      ...PROVIDERS_KEY,
      id,
    ],

    queryFn: () =>
      providerService.getById(
        id
      ),

    enabled:
      !!id,

  });

}

/* -------------------------------- */
/* PROFILE */
/* -------------------------------- */

export function useProviderProfile() {

  return useQuery({

    queryKey: [
      ...PROVIDERS_KEY,
      "profile",
    ],

    queryFn: () =>
      providerService.getProfile(),

  });

}

/* -------------------------------- */
/* UPDATE PROFILE */
/* -------------------------------- */

export function useUpdateProfile() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      providerId,
      payload,
    }) =>

      providerService
        .updateProfile(
          providerId,
          payload
        ),

    onSuccess: () => {

      queryClient
        .invalidateQueries({

          queryKey:
            PROVIDERS_KEY,

        });

    },

  });

}

/* -------------------------------- */
/* AVAILABILITY */
/* -------------------------------- */

export function useAvailability(
  id
) {

  return useQuery({

    queryKey: [
      ...PROVIDERS_KEY,
      id,
      "availability",
    ],

    queryFn: () =>
      providerService
        .getAvailability(id),

    enabled:
      !!id,

  });

}

export function useUpdateAvailability() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      schedule,
    }) =>

      providerService
        .updateAvailability(
          id,
          schedule
        ),

    onSuccess: () => {

      queryClient
        .invalidateQueries({

          queryKey:
            PROVIDERS_KEY,

        });

    },

  });

}

/* -------------------------------- */
/* SERVICES */
/* -------------------------------- */

export function useProviderServices(
  id
) {

  return useQuery({

    queryKey: [
      ...PROVIDERS_KEY,
      id,
      "services",
    ],

    queryFn: () =>
      providerService
        .getServices(id),

    enabled:
      !!id,

  });

}

export function useCreateService() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      providerId,
      payload,
    }) =>

      providerService
        .createService(
          providerId,
          payload
        ),

    onSuccess: () => {

      queryClient
        .invalidateQueries({

          queryKey:
            PROVIDERS_KEY,

        });

    },

  });

}

export function useUpdateService() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      providerId,
      serviceId,
      payload,
    }) =>

      providerService
        .updateService(
          providerId,
          serviceId,
          payload
        ),

    onSuccess: () => {

      queryClient
        .invalidateQueries({

          queryKey:
            PROVIDERS_KEY,

        });

    },

  });

}

export function useDeleteService() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      providerId,
      serviceId,
    }) =>

      providerService
        .deleteService(
          providerId,
          serviceId
        ),

    onSuccess: () => {

      queryClient
        .invalidateQueries({

          queryKey:
            PROVIDERS_KEY,

        });

    },

  });

}

/* -------------------------------- */
/* REVIEWS */
/* -------------------------------- */

export function useReviews(
  providerId
) {

  return useQuery({

    queryKey: [
      ...PROVIDERS_KEY,
      providerId,
      "reviews",
    ],

    queryFn: () =>

      providerService
        .getReviews(
          providerId
        ),

    enabled:
      !!providerId,

  });

}

export function useCreateReview() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      customerId,
      payload,
    }) =>

      providerService
        .createReview(
          customerId,
          payload
        ),

    onSuccess: () => {

      queryClient
        .invalidateQueries({

          queryKey:
            PROVIDERS_KEY,

        });

    },

  });

}

/* -------------------------------- */
/* APPROVE PROVIDER */
/* -------------------------------- */

export function useApproveProvider() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      (providerId) =>

        providerService
          .approveProvider(
            providerId
          ),

    onSuccess: () => {

      queryClient
        .invalidateQueries({

          queryKey:
            PROVIDERS_KEY,

        });

    },

  });

}

/* -------------------------------- */
/* REJECT PROVIDER */
/* -------------------------------- */

export function useRejectProvider() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      (providerId) =>

        providerService
          .rejectProvider(
            providerId
          ),

    onSuccess: () => {

      queryClient
        .invalidateQueries({

          queryKey:
            PROVIDERS_KEY,

        });

    },

  });

}

export function useNearbyProviders(

    location,

    city

){

    return useQuery({

        queryKey: [

            "providers",

            "nearby",

            location,

            city

        ],

        queryFn: () =>

            providerService
                .getNearbyProviders(

                    location,

                    city

                ),

        enabled:
            !!city

    });

}

export const useAdminProviders = () => {
  return useQuery({
    queryKey: ["admin-providers"],
    queryFn: getAllProviders,
  });
};


export function useSubmitUpdateRequest() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: ({

            providerId,

            payload

        }) =>

            providerService.submitUpdateRequest(

                providerId,

                payload

            ),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["providers"]

            });

            queryClient.invalidateQueries({

                queryKey: [

                    "provider-update-request"

                ]

            });

        }

    });

}

export function usePendingUpdateRequest(
    providerId
) {

    return useQuery({

        queryKey: [

            "provider-update-request",

            providerId

        ],

        queryFn: () =>

            providerService.getPendingUpdateRequest(

                providerId

            ),

        enabled: !!providerId

    });

}

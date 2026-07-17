import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import providerService from "../services/providerService";

export function usePendingProviderUpdates() {

    return useQuery({

        queryKey: ["provider-update-requests"],

        queryFn: () =>
            providerService.getPendingProviderUpdates()

    });

}

export function useApproveProviderUpdate() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({ requestId, remarks }) =>
            providerService.approveProviderUpdate(
                requestId,
                remarks
            ),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["provider-update-requests"]
            });

        }

    });

}

export function useRejectProviderUpdate() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({ requestId, remarks }) =>
            providerService.rejectProviderUpdate(
                requestId,
                remarks
            ),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["provider-update-requests"]
            });

        }

    });

}
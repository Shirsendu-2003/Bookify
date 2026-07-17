import { useQuery }
from "@tanstack/react-query";

import notificationService
from "../services/notificationService";

export function useNotifications(
    enabled = true
){

    return useQuery({

        queryKey:["notifications"],

        queryFn:
            notificationService
                .getNotifications,

        enabled,

        staleTime:
            1000 * 60,

    });

}
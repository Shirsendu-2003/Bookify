import { QueryClient } from "@tanstack/react-query";

/* ====================================== */
/* HELPERS */
/* ====================================== */

function shouldRetry(
  failureCount,

  error,
) {
  const status = error?.response?.status;

  /* AUTH / CLIENT ERRORS */

  if (status === 400 || status === 401 || status === 403 || status === 404) {
    return false;
  }

  /* MAX RETRIES */

  return failureCount < 3;
}

/* ====================================== */
/* QUERY CLIENT */
/* ====================================== */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,

      staleTime: 1000 * 60 * 5,

      gcTime: 1000 * 60 * 30,

      refetchOnWindowFocus: false,

      refetchOnReconnect: true,

      refetchOnMount: false,
    },

    mutations: {
      retry: false,
    },
  },
});

/* ====================================== */
/* GLOBAL HELPERS */
/* ====================================== */

export function invalidateQuery(key) {
  return queryClient.invalidateQueries({
    queryKey: [key],
  });
}

export function clearCache() {
  queryClient.clear();
}

export default queryClient;

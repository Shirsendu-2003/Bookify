import { useNavigate } from "react-router-dom";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import authService from "../services/authService";

const AUTH_QUERY_KEY = ["auth","me"];

export function useAuth() {

  const navigate =
    useNavigate();

  const queryClient =
    useQueryClient();

  /* ---------------------- */
  /* CURRENT USER */
  /* ---------------------- */

  const {

    data:user,

    isLoading,

    error,

    refetch,

  } = useQuery({

    queryKey:
      AUTH_QUERY_KEY,

    queryFn:
      authService.me,

    retry:false,

    staleTime:
      1000 * 60 * 5,

    enabled:
      authService
        .isAuthenticated(),

  });

  /* ---------------------- */
  /* LOGIN */
  /* ---------------------- */

  const loginMutation =
    useMutation({

      mutationFn:
        ({
          credentials,
          remember,
        })=>

          authService.login(

            credentials,

            remember

          ),

      onSuccess:(data)=>{

        queryClient.setQueryData(

          AUTH_QUERY_KEY,

          data

        );

      },

    });

  /* ---------------------- */
  /* REGISTER */
  /* ---------------------- */

  const registerMutation =
    useMutation({

      mutationFn:
        authService.register,

    });

  /* ---------------------- */
  /* LOGOUT */
  /* ---------------------- */

  const logout=()=>{

    authService.logout();

    queryClient.clear();

    navigate("/login");

  };

  return {

    /* USER */

    user,

    isLoading,

    error,

    refetch,

    isAuthenticated:
      authService
        .isAuthenticated(),

    /* LOGIN */

    login:
      loginMutation.mutateAsync,

    loginLoading:
      loginMutation
        .isPending,

    loginError:
      loginMutation.error,

    /* REGISTER */

    register:
      registerMutation
        .mutateAsync,

    registerLoading:
      registerMutation
        .isPending,

    registerError:
      registerMutation.error,

    /* LOGOUT */

    logout,

  };

}
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import bookingService from
"../services/bookingService";

const BOOKINGS_KEY = ["bookings"];

export function useBookings(

  params = {}

){

  return useQuery({

    queryKey:[
      ...BOOKINGS_KEY,
      params,
    ],

    queryFn:()=>

      bookingService
        .getAll(params),

    staleTime:
      1000 * 60 * 5,

  });

}

/* ---------------------- */
/* SINGLE BOOKING */
/* ---------------------- */

export function useBooking(id, options = {}) {
  return useQuery({
    queryKey: [...BOOKINGS_KEY, id],
    queryFn: () => bookingService.getById(id),
    enabled: !!id,
    ...options,
  });
}

/* ---------------------- */
/* CREATE */
/* ---------------------- */

export function
useCreateBooking(){

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      bookingService.create,

    onSuccess:()=>{

      queryClient.invalidateQueries({

        queryKey:
          BOOKINGS_KEY,

      });

    },

  });

}

/* ---------------------- */
/* UPDATE */
/* ---------------------- */

export function
useUpdateBooking(){

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      ({
        id,
        payload,
      })=>

        bookingService
          .update(
            id,
            payload
          ),

    onSuccess:()=>{

      queryClient.invalidateQueries({

        queryKey:
          BOOKINGS_KEY,

      });

    },

  });

}

/* ---------------------- */
/* DELETE */
/* ---------------------- */

export function
useDeleteBooking(){

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      bookingService.remove,

    onMutate:
      async(id)=>{

      await queryClient
        .cancelQueries({

        queryKey:
          BOOKINGS_KEY,

      });

      const previous =

        queryClient
        .getQueryData(
          BOOKINGS_KEY
        );

      queryClient
      .setQueryData(

        BOOKINGS_KEY,

        (old)=>

          old?.filter(
            (b)=>

            b.id!==id
          )

      );

      return {

        previous,

      };

    },

    onError:
      (_err,_id,ctx)=>{

      queryClient
      .setQueryData(

        BOOKINGS_KEY,

        ctx.previous

      );

    },

    onSettled:()=>{

      queryClient
      .invalidateQueries({

        queryKey:
          BOOKINGS_KEY,

      });

    },

  });

}

/* ---------------------- */
/* CANCEL */
/* ---------------------- */

export function useCancelBooking(){

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      bookingService.cancel,

    onSuccess:()=>{

      queryClient.invalidateQueries({

        queryKey:
          BOOKINGS_KEY,

      });

      queryClient.invalidateQueries({

        queryKey:
          ["providerBookings"],

      });

      queryClient.invalidateQueries({

        queryKey:
          ["customerBookings"],

      });

    },

  });

}
/* ---------------------- */
/* ACCEPT */
/* ---------------------- */

/* ---------------------- */
/* ACCEPT */
/* ---------------------- */

export function useAcceptBooking(){

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      bookingService.accept,

    onSuccess:()=>{

      queryClient.invalidateQueries({

        queryKey:["providerBookings"]

      });

      queryClient.invalidateQueries({

        queryKey:BOOKINGS_KEY

      });

    },

  });

}

/* ---------------------- */
/* REJECT */
/* ---------------------- */
export function useRejectBooking(){

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      bookingService.reject,

    onSuccess:()=>{

      queryClient.invalidateQueries({

        queryKey:["providerBookings"]

      });

      queryClient.invalidateQueries({

        queryKey:BOOKINGS_KEY

      });

    },

  });

}
/* ---------------------- */
/* STATUS */
/* ---------------------- */

export function useUpdateBookingStatus(){

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      ({
        id,
        status,
      })=>

        bookingService
          .updateStatus(
            id,
            status
          ),

    onSuccess:()=>{

      queryClient.invalidateQueries({

        queryKey:["providerBookings"]

      });

      queryClient.invalidateQueries({

        queryKey:BOOKINGS_KEY

      });

    },

  });

}

/* ---------------------- */
/* PROVIDER BOOKINGS */
/* ---------------------- */

export function useProviderBookings(
  providerId
){

  return useQuery({

    queryKey:[
      "providerBookings",
      providerId,
    ],

    queryFn:()=>

      bookingService
        .getProviderBookings(
          providerId
        ),

    enabled:!!providerId,

    staleTime:
      1000 * 60 * 5,

  });

}

export function useCustomerBookings(
  customerId
){

  return useQuery({

    queryKey:[
      "customerBookings",
      customerId,
    ],

    queryFn:()=>

      bookingService
        .getCustomerBookings(
          customerId
        ),

    enabled:!!customerId,

    staleTime:
      1000 * 60 * 5,

  });

}

/* ---------------------- */
/* VERIFY START OTP */
/* ---------------------- */

export function useVerifyStartOtp() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      ({
        bookingId,
        otp,
      }) =>

        bookingService
          .verifyStartOtp(
            bookingId,
            otp
          ),

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey:
          BOOKINGS_KEY,

      });

      queryClient.invalidateQueries({

        queryKey: [
          "customerBookings",
        ],

      });

      queryClient.invalidateQueries({

        queryKey: [
          "providerBookings",
        ],

      });

    },

  });

}

/* ---------------------- */
/* GENERATE COMPLETION OTP */
/* ---------------------- */

export function useGenerateCompletionOtp() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      bookingService
        .generateCompletionOtp,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey:
          BOOKINGS_KEY,

      });

      queryClient.invalidateQueries({

        queryKey: [
          "customerBookings",
        ],

      });

      queryClient.invalidateQueries({

        queryKey: [
          "providerBookings",
        ],

      });

    },

  });

}

/* ---------------------- */
/* VERIFY COMPLETION OTP */
/* ---------------------- */

export function useVerifyCompletionOtp() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      ({
        bookingId,
        otp,
      }) =>

        bookingService
          .verifyCompletionOtp(
            bookingId,
            otp
          ),

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey:
          BOOKINGS_KEY,

      });

      queryClient.invalidateQueries({

        queryKey: [
          "customerBookings",
        ],

      });

      queryClient.invalidateQueries({

        queryKey: [
          "providerBookings",
        ],

      });

    },

  });

}

export function useFinishWork() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (bookingId) =>
      bookingService.finishWork(
        bookingId
      ),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

    },

  });
}

export function useCreateInstantBooking() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (data) =>
      bookingService
        .createInstantBooking(data),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["bookings"]
      });

    }

  });

}
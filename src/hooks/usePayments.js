import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import paymentService from
"../services/paymentService";

const PAYMENTS_KEY =
  ["payments"];

/* -------------------------- */
/* ALL PAYMENTS */
/* -------------------------- */

export function usePayments(
  params={}
){

  return useQuery({

    queryKey:[

      ...PAYMENTS_KEY,

      params,

    ],

    queryFn:()=>

      paymentService
        .getAll(params),

    staleTime:
      1000 * 60 * 5,

  });

}

/* -------------------------- */
/* SINGLE PAYMENT */
/* -------------------------- */

export function usePayment(
  id
){

  return useQuery({

    queryKey:[

      ...PAYMENTS_KEY,

      id,

    ],

    queryFn:()=>

      paymentService
        .getById(id),

    enabled:!!id,

  });

}

/* -------------------------- */
/* CUSTOMER PAYMENTS */
/* -------------------------- */

/* -------------------------- */
/* CUSTOMER PAYMENTS */
/* -------------------------- */

export function
useCustomerPayments(
  customerId
){

  return useQuery({

    queryKey:[

      ...PAYMENTS_KEY,

      "customer",

      customerId,

    ],

    queryFn:()=>

      paymentService
        .getCustomerPayments(
          customerId
        ),

    enabled:
      !!customerId,

  });

}



/* -------------------------- */
/* ADMIN PAYMENTS */
/* -------------------------- */

export function
useAdminPayments(){

  return useQuery({

    queryKey:[

      ...PAYMENTS_KEY,

      "admin",

    ],

    queryFn:

      paymentService
        .getAdminPayments,

  });

}

/* -------------------------- */
/* CREATE PAYMENT */
/* -------------------------- */

export function
useCreatePayment(){

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      paymentService.create,

    onSuccess:()=>{

      queryClient
      .invalidateQueries({

        queryKey:
          PAYMENTS_KEY,

      });

    },

  });

}

/* -------------------------- */
/* PROCESS PAYMENT */
/* -------------------------- */

export function
useProcessPayment(){

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      ({
        bookingId,
        payload,
      })=>

        paymentService
        .process(

          bookingId,

          payload

        ),

    onSuccess:()=>{

      queryClient
      .invalidateQueries({

        queryKey:
          PAYMENTS_KEY,

      });

    },

  });

}

/* -------------------------- */
/* REFUND */
/* -------------------------- */

export function
useRefundPayment(){

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      paymentService.refund,

    onSuccess:()=>{

      queryClient
      .invalidateQueries({

        queryKey:
          PAYMENTS_KEY,

      });

    },

  });

}

/* -------------------------- */
/* STATUS UPDATE */
/* -------------------------- */

export function
useUpdatePaymentStatus(){

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      ({
        id,
        status,
      })=>

        paymentService
        .updateStatus(

          id,

          status

        ),

    onSuccess:()=>{

      queryClient
      .invalidateQueries({

        queryKey:
          PAYMENTS_KEY,

      });

    },

  });

}

/* -------------------------- */
/* DOWNLOAD INVOICE */
/* -------------------------- */

export function
useDownloadInvoice(){

  return useMutation({

    mutationFn:
      async(id)=>{

      const response =

        await paymentService
        .downloadInvoice(id);

      const blob =
        new Blob([

          response.data,

        ]);

      const url =

        window.URL
        .createObjectURL(
          blob
        );

      window.open(
        url,
        "_blank"
      );

      return response;

    },

  });

}

/* -------------------------- */
/* LOOKUP */
/* -------------------------- */

export function
useTransactionLookup(

  transactionId

){

  return useQuery({

    queryKey:[

      ...PAYMENTS_KEY,

      "lookup",

      transactionId,

    ],

    queryFn:()=>

      paymentService
      .lookup(

        transactionId

      ),

    enabled:
      !!transactionId,

  });

}
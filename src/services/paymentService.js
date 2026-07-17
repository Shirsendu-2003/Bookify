import api from "./api";

const paymentService = {

  /* -------------------------- */
  /* GET ALL PAYMENTS */
  /* -------------------------- */

  async getAll(params = {}) {

  const response =
    await api.get(
      "/payment",
      { params }
    );

  return response.data.data;
},

  /* -------------------------- */
  /* GET PAYMENT BY ID */
  /* -------------------------- */

  async getById(id){

    const response =
      await api.get(

        `/payment/${id}`

      );

    return response.data;

  },

  /* -------------------------- */
  /* CREATE PAYMENT */
  /* -------------------------- */

  async createPayment(

    paymentData

  ){

    const response =

      await api.post(

        "/payment",
        paymentData

      );

    return response.data;

  },



  /* -------------------------- */
  /* CUSTOMER PAYMENTS */
  /* -------------------------- */

 async getCustomerPayments(
    customerId
  ){

    const response =
      await api.get(

        `/payment/customer/${customerId}`

      );

    return response.data;

  },

  /* -------------------------- */
  /* BOOKING PAYMENTS */
  /* -------------------------- */

  async getBookingPayments(

    bookingId,

    page = 0,

    size = 10

  ){

    const response =
      await api.get(

        `/payment/booking/${bookingId}`,

        {

          params:{

            page,
            size,

          },

        }

      );

    return response.data;

  },

  /* -------------------------- */
  /* REFUND PAYMENT */
  /* -------------------------- */

  async refund(

    paymentId,

    reason

  ){

    const response =
      await api.put(

        `/payment/${paymentId}/refund`,

        null,

        {

          params:{
            reason,
          },

        }

      );

    return response.data;

  },

  /* -------------------------- */
  /* SEARCH PAYMENTS */
  /* -------------------------- */

  async lookup(

    keyword,

    page = 0,

    size = 10

  ){

    const response =
      await api.get(

        "/payment/search",

        {

          params:{

            keyword,
            page,
            size,

          },

        }

      );

    return response.data;

  },

 async createOrder(
  bookingId,
  amount
) {

  const response =
    await api.post(
      "/payment/create-order",
      {
        bookingId,
        amount,
      }
    );

  return response.data;
},

async verifyPayment(
  paymentData
) {

  const response =
    await api.post(
      "/payment/verify-payment",
      paymentData
    );

  return response.data;
},

};

export default paymentService;
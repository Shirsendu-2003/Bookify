import api from "./api";

const bookingService = {

  /* -------------------------- */
  /* GET ALL BOOKINGS */
  /* -------------------------- */

   async getAll(params = {}) {

    const response =
      await api.get(
        "/bookings",
        { params }
      );

    return response.data;
  },

  /* -------------------------- */
  /* GET SINGLE BOOKING */
  /* -------------------------- */

  async getById(id){

    const response =
      await api.get(
        `/bookings/${id}`
      );

    return response.data;
  },

  /* -------------------------- */
  /* CREATE BOOKING */
  /* -------------------------- */

 async create({

  customerId,

  ...payload

}){

  console.log(

    "POST URL:",

    `/bookings/customer/${customerId}`

  );

  console.log(

    "PAYLOAD:",

    payload

  );

  const response =
    await api.post(

      `/bookings/customer/${customerId}`,

      payload

    );

  return response.data;

},
  /* -------------------------- */
  /* UPDATE BOOKING */
  /* -------------------------- */

  async update(id,payload){

    const response =
      await api.put(

        `/bookings/${id}`,

        payload

      );

    return response.data;
  },

  /* -------------------------- */
  /* DELETE BOOKING */
  /* -------------------------- */

  async remove(id){

    const response =
      await api.delete(
        `/bookings/${id}`
      );

    return response.data;
  },

  /* -------------------------- */
  /* CANCEL BOOKING */
  /* -------------------------- */

 /* -------------------------- */
/* CANCEL BOOKING */
/* -------------------------- */

async cancel(id){

  const response =
    await api.put(

      `/bookings/${id}/status`,

      {
        status:"CANCELLED"
      }

    );

  return response.data;
},

/* -------------------------- */
/* ACCEPT BOOKING */
/* -------------------------- */

async accept(id){

  const response =
    await api.put(

      `/bookings/${id}/status`,

      {
        status:"ACCEPTED"
      }

    );

  return response.data;
},

/* -------------------------- */
/* REJECT BOOKING */
/* -------------------------- */

async reject(id){

  const response =
    await api.put(

      `/bookings/${id}/status`,

      {
        status:"REJECTED"
      }

    );

  return response.data;
},

/* -------------------------- */
/* UPDATE STATUS */
/* -------------------------- */

async updateStatus(
  id,
  status
){

  const response =
    await api.put(

      `/bookings/${id}/status`,

      {
        status
      }

    );

  return response.data;
},

  /* -------------------------- */
  /* CUSTOMER BOOKINGS */
  /* -------------------------- */

  async getCustomerBookings(
    customerId
  ){

    const response =
      await api.get(

        `/bookings/customer/${customerId}`

      );

    return response.data;
  },

  /* -------------------------- */
  /* PROVIDER BOOKINGS */
  /* -------------------------- */

  async getProviderBookings(
    providerId
  ){

    const response =
      await api.get(

        `/bookings/provider/${providerId}`

      );

    return response.data;
  },

  /* -------------------------- */
  /* ADMIN BOOKINGS */
  /* -------------------------- */

  async getAdminBookings(){

    const response =
      await api.get(
        "/bookings/admin"
      );

    return response.data;
  },

   async verifyCompletionOtp(
    bookingId,
    otp
  ) {

    const response = await api.post(

      `/bookings/${bookingId}/verify-completion-otp`,

      { otp }

    );

    return response.data;
  },

   async generateCompletionOtp(
    bookingId
  ) {

    const response = await api.post(

      `/bookings/${bookingId}/generate-completion-otp`

    );

    return response.data;
  },

  async verifyStartOtp(
    bookingId,
    otp
  ) {

    const response = await api.post(

      `/bookings/${bookingId}/verify-start-otp`,

      { otp }

    );

    return response.data;
  },

    async reject(id) {

    const response = await api.put(
      `/bookings/${id}/reject`
    );

    return response.data;
  },

   async accept(id) {

    const response = await api.put(
      `/bookings/${id}/accept`
    );

    return response.data;
  },

  async finishWork(bookingId) {

  const response =
    await api.post(
      `/bookings/${bookingId}/finish-work`
    );

  return response.data;
},
async createInstantBooking(data) {

  const response =
    await api.post(
      "/bookings/instant",
      data
    );

  return response.data;
},

async uploadProof(bookingId, formData) {

    const response = await api.post(

        `/bookings/${bookingId}/upload-proof`,

        formData,

        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }

    );

    return response.data;
},

};

export default bookingService;
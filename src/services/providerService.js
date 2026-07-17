import api from "./api";

const providerService = {

  /* ------------------------- */
  /* GET ALL PROVIDERS */
  /* ------------------------- */

  async getAll(params = {}) {

    const response =
      await api.get(
        "/providers",
        { params }
      );

    return response.data;
  },

  /* ------------------------- */
  /* SEARCH PROVIDERS */
  /* ------------------------- */

  async search(query){

    const response =
      await api.get(

        "/providers/search",

        {
          params:{
            keyword:query
          }
        }

      );

    return response.data;
  },

  /* ------------------------- */
  /* GET SINGLE PROVIDER */
  /* ------------------------- */

  async getById(id){

    const response =
      await api.get(
        `/providers/${id}`
      );

    return response.data;
  },

  /* ------------------------- */
  /* CREATE PROVIDER */
  /* ------------------------- */

  async create(
  userId,
  payload
){

  const response =
    await api.post(

      `/providers/user/${userId}`,

      payload

    );

  return response.data;
},

  /* ------------------------- */
  /* UPDATE PROVIDER */
  /* ------------------------- */

  async update(
    id,
    payload
  ){

    const response =
      await api.put(

        `/providers/${id}`,

        payload

      );

    return response.data;
  },

  /* ------------------------- */
  /* DELETE PROVIDER */
  /* ------------------------- */

  async remove(id){

    const response =
      await api.delete(
        `/providers/${id}`
      );

    return response.data;
  },

  /* ------------------------- */
  /* PROVIDER PROFILE */
  /* ------------------------- */
async getProfile(){

  const response =
    await api.get(
      "/providers/profile"
    );

  return response.data;
},

  /* ------------------------- */
  /* UPDATE PROFILE */
  /* ------------------------- */

  async updateProfile(

  providerId,

  payload

){

  const response =
    await api.put(

      `/providers/${providerId}`,

      payload

    );

  return response.data;
},



  /* ------------------------- */
  /* AVAILABILITY */
  /* ------------------------- */
async getAvailability(id) {

  const response =
    await api.get(
      `/providers/${id}/availability`
    );

  return response.data.data;
},

  async updateAvailability(

    id,

    schedule

  ){

    const requests =

      schedule.map(

        (item)=>

          api.post(

            `/providers/${id}/availability`,

            item

          )

      );

    return Promise.all(
      requests
    );
  },

  /* ------------------------- */
  /* SERVICES */
  /* ------------------------- */

  async getServices(id){

    const response =
      await api.get(

        `/providers/${id}/services`

      );

    return response.data;
  },

  async createService(
    providerId,
    payload
  ){

    const response =
      await api.post(

        `/providers/${providerId}/services`,

        payload

      );

    return response.data;
  },

  async updateService(

    providerId,

    serviceId,

    payload

  ){

    const response =
      await api.put(

        `/providers/${providerId}/services/${serviceId}`,

        payload

      );

    return response.data;
  },

  async deleteService(

    providerId,

    serviceId

  ){

    const response =
      await api.delete(

        `/providers/${providerId}/services/${serviceId}`

      );

    return response.data;
  },

  /* ------------------------- */
  /* REVIEWS */
  /* ------------------------- */

  async getReviews(
  providerId
){

  const response =
    await api.get(

      `/review/provider/${providerId}`

    );

  return response.data;

},

 async createReview(
  customerId,
  payload
){

  const response =
    await api.post(

      `/review/customer/${customerId}`,

      payload

    );

  return response.data;

},

  /* ------------------------- */
  /* DASHBOARD */
  /* ------------------------- */

  async getDashboardStats(){

    const response =
      await api.get(
        "/providers/dashboard"
      );

    return response.data;
  },



/* ------------------------- */
/* APPROVE PROVIDER */
/* ------------------------- */
async approveProvider(
    providerId
){

    const response =
        await api.put(
            `/providers/${providerId}/approve`
        );

    return response.data;
},

/* ------------------------- */
/* REJECT PROVIDER */
/* ------------------------- */

async rejectProvider(
    providerId
){

    const response =
        await api.put(
            `/providers/${providerId}/reject`
        );

    return response.data;
},


async getNearbyProviders(

    location,

    city

){

    const response =

        await api.get(

            "/providers/nearby",

            {
                params: {
                    location,
                    city
                }
            }

        );

    return response.data;
},
async getPendingProviderUpdates() {

    const response = await api.get(
        "/admin/providers/provider-update-requests"
    );

    return response.data;
},

async approveProviderUpdate(
    requestId,
    remarks
) {

    const response = await api.put(

        `/admin/providers/provider-update-requests/${requestId}/approve`,

        {
            remarks
        }

    );

    return response.data;
},

async rejectProviderUpdate(
    requestId,
    remarks
) {

    const response = await api.put(

        `/admin/providers/provider-update-requests/${requestId}/reject`,

        {
            remarks
        }

    );

    return response.data;
},
async submitUpdateRequest(
    providerId,
    payload
) {

    const response =
        await api.post(

            `/providers/${providerId}/update-request`,

            payload

        );

    return response.data;

},

async getPendingUpdateRequest(
    providerId
) {

    const response =
        await api.get(

            `/providers/${providerId}/update-request`

        );

    return response.data;

},

};


export default providerService;
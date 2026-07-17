import api from "./api";

const dashboardService = {

  /* -------------------------- */
  /* ADMIN DASHBOARD */
  /* -------------------------- */

    async getAdminDashboard(){

    const response =
      await api.get(
        "/dashboard/admin"
      );

    return (
      response.data.data ||
      response.data
    );

  },

  /* -------------------------- */
  /* PROVIDER DASHBOARD */
  /* -------------------------- */

  async getProviderDashboard(){

    const response =
      await api.get(
        "/dashboard/provider"
      );

    return (
      response.data.data ||
      response.data
    );

  },

  /* -------------------------- */
  /* CUSTOMER DASHBOARD */
  /* -------------------------- */

  async getCustomerDashboard(){

    const response =
      await api.get(
        "/dashboard"
      );

  

    return (
      response.data.data ||
      response.data
    );

  },

  /* -------------------------- */
  /* REVENUE ANALYTICS */
  /* -------------------------- */

  async getRevenueAnalytics(
  period="monthly"
){

  const response =
    await api.get(
      "/dashboard/revenue",
      {
        params:{period}
      }
    );

  return (

    response.data.data ||

    response.data

  );

},

async getProviderRevenueAnalytics(

  period="monthly"

){

  const response =

      await api.get(

          "/dashboard/provider/revenue",

          {
            params:{period}
          }

      );

  return response.data;

},

async getAdminRevenueAnalytics(

  period="monthly"

){

  const response=

      await api.get(

          "/dashboard/admin/revenue",

          {
            params:{period}
          }

      );

  return response.data;

},


  /* -------------------------- */
  /* BOOKING ANALYTICS */
  /* -------------------------- */

async getBookingAnalytics(

  period="monthly"

){

  const response=

    await api.get(

      "/dashboard/bookings",

      {
        params:{period}
      }

    );

  return response.data;

},

async getProviderBookingAnalytics(

  period="monthly"

){

  const response=

    await api.get(

      "/dashboard/provider/bookings",

      {
        params:{period}
      }

    );

  return response.data;

},

async getAdminBookingAnalytics(

  period="monthly"

){

  const response=

    await api.get(

      "/dashboard/admin/bookings",

      {
        params:{period}
      }

    );

  return response.data;

},

  /* -------------------------- */
  /* KPI STATS */
  /* -------------------------- */

  async getStats() {

    const response =
      await api.get(
        "/dashboard/stats"
      );

    return response.data;
  },

  /* -------------------------- */
  /* ACTIVITIES */
  /* -------------------------- */

  async getActivities(
    page = 0,
    size = 10
  ) {

    const response =
      await api.get(
        "/dashboard/activities",
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
  /* USERS */
  /* -------------------------- */

  async getUsers(
    page = 0,
    size = 10
  ) {

    const response =
      await api.get(
        "/dashboard/users",
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
  /* REPORTS */
  /* -------------------------- */

  async getReports(
    params = {}
  ) {

    const response =
      await api.get(
        "/dashboard/reports",
        { params }
      );

    return response.data;
  },

  /* -------------------------- */
  /* EXPORT REPORT */
  /* -------------------------- */
async exportReport(
  reportType = "dashboard",
  format = "pdf"
) {

  const response =
    await api.post(
      `/report/${reportType}`,
      null,
      {
        params: {
          format,
          generatedBy: "Admin"
        }
      }
    );

  return response.data;
},
  /* -------------------------- */
  /* COMPLAINTS */
  /* -------------------------- */

 async getComplaints(){

  const response =

    await api.get(
      "/dashboard/complaints"
    );

  return response.data;
},

async resolveComplaint(id){

  const response =

    await api.patch(

      `/dashboard/complaints/${id}/resolve`

    );

  return response.data;
},

async closeComplaint(id){

  const response =

    await api.patch(

      `/dashboard/complaints/${id}/close`

    );

  return response.data;
},

  /* -------------------------- */
  /* TOP PROVIDERS */
  /* -------------------------- */

  async getTopProviders() {

    const response =
      await api.get(
        "/dashboard/top-providers"
      );

    return response.data;
  },

  /* -------------------------- */
  /* RECENT BOOKINGS */
  /* -------------------------- */

  async getRecentBookings() {

    const response =
      await api.get(
        "/dashboard/recent-bookings"
      );

    return response.data;
  },

  async getProviderRecentJobs(){

  const response =
      await api.get(
          "/dashboard/provider/recent-jobs"
      );

  return response.data;
},

  /* -------------------------- */
  /* TOGGLE USER STATUS */
  /* -------------------------- */

  async toggleUserStatus(
    userId,
    enabled
  ) {

    const response =
      await api.patch(
        `/dashboard/users/${userId}/status`,
        { enabled }
      );

    return response.data;
  },

  /* -------------------------- */
/* SETTINGS */
/* -------------------------- */

async getSettings(){

  const response =
    await api.get(
      "/dashboard/settings"
    );

  return response.data;
},

async saveSettings(payload){

  const response =
    await api.post(
      "/dashboard/settings",
      payload
    );

  return response.data;
},

};



export default dashboardService;
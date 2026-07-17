import api from "./api";

const complaintService = {

  async createComplaint(payload){

    const response =

      await api.post(

        "/complaints",

        payload

      );

    return response.data;
  },

  async getMyComplaints(){

    const response =

      await api.get(
        "/complaints/my"
      );

    return response.data;
  },

};

export default complaintService;
import api from "./api";

const contactService = {

  async sendMessage(payload){

    const response =

      await api.post(

        "/contact",

        payload

      );

    return response.data;
  },

};

export default contactService;
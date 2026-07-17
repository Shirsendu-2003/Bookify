import api from "./api";

const notificationService={

    async getNotifications(){

        const response=

            await api.get(
                "/notifications"
            );

        return response.data;

    },

};

export default
notificationService;
// services/adminProviderService.js

import api from "./api";

export const getAllProviders = async () => {
  const response = await api.get("/admin/providers");
  return response.data;
};
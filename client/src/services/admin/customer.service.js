import api from "../axios";

export const getCustomers = async () => {
  const response = await api.get("/admin/customers");
  return response.data.data;
};

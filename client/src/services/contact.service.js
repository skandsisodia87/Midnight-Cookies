import api from "../services/axios";

export const constactUS = async (body) => {
  const response = await api.post("/contact", body);
  return response.data;
};

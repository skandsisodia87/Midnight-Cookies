import api from "./axios";

export const createConversation = async () => {
  const response = await api.post("/conversations");
  return response.data;
};

export const getConversationById = async (id) => {
  const response = await api.get(`/conversations/${id}`);
  return response.data;
};

export const createMessage = async ({ body, conversationId }) => {
  const response = await api.post(`/conversations/${conversationId}/messages`);
  return response.data;
};

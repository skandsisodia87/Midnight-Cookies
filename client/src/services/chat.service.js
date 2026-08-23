import api from "./axios";

export const createConversation = async () => {
  const response = await api.post("/conversations");
  return response.data;
};

export const getConversationById = async (id) => {
  const response = await api.get(`/conversations/${id}`);
  return response.data;
};

export const getConversationMessages = async (conversationId) => {
  const response = await api.get(`/conversations/${conversationId}/messages`);
  return response.data;
};

export const getUnassignConversation = async () => {
  const response = await api.get(`/conversations-unassign`);
  return response.data?.conversations;
};

export const getAllConversations = async () => {
  const response = await api.get(`/conversations`);
  return response.data?.conversations;
};

export const assignConversation = async (conversationId) => {
  const response = await api.patch(`/conversations/${conversationId}/assign`);
  return response.data;
};

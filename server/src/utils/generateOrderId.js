export const generateOrderId = () => {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();

  const timestamp = Date.now().toString().slice(-4);

  return `MC-${randomPart}${timestamp}`;
};

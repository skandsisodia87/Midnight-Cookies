export const getFullAddress = (address) => {
  if (!address) return "";

  return `${address.fullAddress}, ${address.city}, ${address.state} - ${address.pincode}`;
};

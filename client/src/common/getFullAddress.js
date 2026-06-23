export const getFullAddress = (address) => {
  if (!address) return "";

  return `${address.address}, ${address.city}, ${address.state} - ${address.pincode}`;
};

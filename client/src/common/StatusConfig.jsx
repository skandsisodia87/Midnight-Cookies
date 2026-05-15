import { FiPackage, FiTruck, FiCheckCircle, FiClock } from "react-icons/fi";
import constants from "./constants";

const StatusConfig = {
  placed: {
    icon: <FiClock />,
    color: "bg-yellow-100 text-yellow-700",
    text: constants.PLACED,
  },

  shipped: {
    icon: <FiTruck />,
    color: "bg-blue-100 text-blue-700",
    text: constants.SHIPPED,
  },

  delivered: {
    icon: <FiCheckCircle />,
    color: "bg-green-100 text-green-700",
    text: constants.DELIVERED,
  },

  cancelled: {
    icon: <FiPackage />,
    color: "bg-red-100 text-red-700",
    text: constants.CANCELLED,
  },
};

export default StatusConfig;

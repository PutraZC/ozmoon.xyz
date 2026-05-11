import { 
  FaBoxOpen, FaInfinity, FaExclamationTriangle, FaShoppingCart, FaCheckCircle
} from 'react-icons/fa';

export const getStockInfo = (stock, isOutOfStock, isUnlimited) => {
  if (isOutOfStock) {
    return {
      message: "Out of Stock",
      icon: <FaBoxOpen className="inline mr-1" />,
      color: "text-red-500"
    };
  }
  if (isUnlimited) {
    return {
      message: "Unlimited",
      icon: <FaInfinity className="inline mr-1" />,
      color: "text-purple-400"
    };
  }
  if (stock <= 10) {
    return {
      message: "Almost Gone",
      icon: <FaExclamationTriangle className="inline mr-1" />,
      color: "text-red-400"
    };
  }
  if (stock <= 29) {
    return {
      message: "Limited Stock",
      icon: <FaShoppingCart className="inline mr-1" />,
      color: "text-orange-400"
    };
  }
  if (stock <= 50) {
    return {
      message: "Low Stock",
      icon: <FaExclamationTriangle className="inline mr-1" />,
      color: "text-yellow-400"
    };
  }
  return {
    message: "In Stock",
    icon: <FaCheckCircle className="inline mr-1" />,
    color: "text-green-400"
  };
};
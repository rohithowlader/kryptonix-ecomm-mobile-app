// utils/api.js
import axios from "axios";

export const fetchProducts = async () => {
  const response = await axios.get(
    "https://kryptonix-ecomm.onrender.com/api/products"
  );
  return response.data;
};

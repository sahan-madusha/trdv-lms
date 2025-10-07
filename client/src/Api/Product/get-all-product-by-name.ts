import { message } from "antd";
import { SERVER_API } from "../../Constant";
import axios from "axios";

export const getAllProductByName = async (searchQuery:any) => {
  try {
    const response = await axios.get(
      `${SERVER_API}/Product/get-all-product-by-name.php?searchQuery=${searchQuery}`
    );
    return response.data;
  } catch (error: any) {
    message.error("Something went wrong");
  }
};

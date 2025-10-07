import { SERVER_API } from "../../Constant";
import axios from "axios";
import { message } from "antd";

export const getAgencyProductByName = async (user_key_id:any,searchQuery:any) => {
  try {
    const response = await axios.get(
      `${SERVER_API}/Product/get-agency-product-by-name.php?user_key_id=${user_key_id}&searchQuery=${searchQuery}`,
    );
    return response.data;
  } catch (error: any) {
    message.error("Something went wrong");
  }
};

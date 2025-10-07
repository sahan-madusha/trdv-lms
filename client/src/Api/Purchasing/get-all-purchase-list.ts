import { message } from "antd";
import { SERVER_API } from "../../Constant";
import axios from "axios";

export const getAllPurchase = async () => {
  try {
    const response = await axios.get(
      `${SERVER_API}/Purchasing/get-all-purchase-list.php`,
    );
    return response.data;
  } catch (error: any) {
    message.error("Something went wrong");
  }
};

import { message } from "antd";
import { SERVER_API } from "../../Constant";
import axios from "axios";

export const getOrderRequestByOrderId = async (
  user_key_id: any,
  searchQuery: string
) => {
  try {
    const response = await axios.get(
      `${SERVER_API}/Purchasing/get-agency-order-request-by-orderid.php`,
      {
        params: {
          user_key_id,
          searchQuery,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    message.error("Something went wrong");
  }
};

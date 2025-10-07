import { message } from "antd";
import { SERVER_API } from "../../Constant";
import axios from "axios";

export const getOrderRequestItemsListByOrderId = async (
  user_key_id: any,
  orderid: string
) => {
  try {
    const response = await axios.get(
      `${SERVER_API}/Purchasing/get-order-item-list-by-order-id.php`,
      {
        params: {
          user_key_id,
          orderid,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    message.error("Something went wrong");
  }
};

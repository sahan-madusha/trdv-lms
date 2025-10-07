import { message } from "antd";
import { SERVER_API } from "../../Constant";
import axios from "axios";

export const getAgencyAllProduct = async (
  user_key_id: any,
  pageSize: number,
  offset: number
) => {
  try {
    const response = await axios.get(
      `${SERVER_API}/Product/get-agency-all-product.php`,
      {
        params: {
          user_key_id,
          pageSize,
          offset,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    message.error("Something went wrong");
  }
};

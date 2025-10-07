import { SERVER_API } from "../../Constant";
import axios from "axios";
import { message } from "antd";

export const getAllAppFeature = async (user_key_id:any) => {
  try {
    const response = await axios.get(
      `${SERVER_API}/Users/get-all-features.php?user_key_id=${user_key_id}`,
    );
    return response.data;
  } catch (error: any) {
    message.error("Something went wrong");
  }
};

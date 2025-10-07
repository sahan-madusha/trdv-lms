import { SERVER_API } from "../../Constant";
import axios from "axios";
import { message } from "antd";

export const getEmployeeListBaseOnUsersId = async (
  userId: any,
  pageSize: number,
  offset: number,
) => {
  try {
    const response = await axios.get(
      `${SERVER_API}/Users/get-employee-list-base-on-users-role.php`,
      {
        params: {
          userId,
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

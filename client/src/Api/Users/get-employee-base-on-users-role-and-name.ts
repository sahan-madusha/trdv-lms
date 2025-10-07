import { SERVER_API } from "../../Constant";
import axios from "axios";
import { message } from "antd";

export const getEmployeeBaseOnUsersRoleAndName = async (
  userId: any,
  query?: string
) => {
  try {
    const response = await axios.get(
      `${SERVER_API}/Users/get-employee-base-on-users-role-and-name.php`,
      {
        params: {
          userId,
          searchQuery: query ?? "",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    message.error("Something went wrong");
  }
};

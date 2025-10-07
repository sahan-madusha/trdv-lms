import { SERVER_API, UserRoles } from "../../Constant";
import axios from "axios";
import { message } from "antd";

//admin -> admin , managers , agency and others
//agency -> sales person
export const getUserRoleBaseOnUsersRole = async (userRole: UserRoles) => {
  try {
    const response = await axios.get(
      `${SERVER_API}/Users/get-user-role-base-on-users-role.php?userole=${userRole}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    message.error("Somthing went wrong");
  }
};

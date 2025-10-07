import { SERVER_API } from "../../Constant";
import axios from "axios";
import { message } from "antd";

export const AddNewEmployee = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append("inputs", JSON.stringify(data));

    const response = await axios.post(
      `${SERVER_API}/Users/manage-system-employee.php`,
      formData,
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

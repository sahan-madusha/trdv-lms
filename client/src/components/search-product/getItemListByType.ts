import { ProductSearchType } from "../../Constant";
import {
  getAllProductByName,
  getAgencyProductByName,
  getEmployeeBaseOnUsersRoleAndName,
  getOrderRequestByOrderId,
} from "../../Api";

export const getItemListByType = async (
  type: ProductSearchType,
  query: string,
  queryData?: { user_id?: any }
): Promise<any[]> => {
  switch (type) {
    //Fetch all product
    case ProductSearchType.ALL_PRODUCTS:
      return (await getAllProductByName(query))?.productList || [];

    //Fetch agency product
    case ProductSearchType.AGENCY_PRODUCTS:
      return (
        (await getAgencyProductByName(queryData?.user_id, query))
          ?.productList || []
      );
    //Fetch employee list by name
    case ProductSearchType.EMPLOYEE_LIST_BY_ROLE_AND_NAME:
      return (
        (await getEmployeeBaseOnUsersRoleAndName(queryData?.user_id, query))
          ?.employeeList || []
      );
    //Fetch order list by order id
    case ProductSearchType.ORDER_LIST_BY_AGENCY_ID:
      return (
        (await getOrderRequestByOrderId(queryData?.user_id, query))
          ?.orderingList || []
      );

    default:
      return [];
  }
};

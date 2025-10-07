import { useEffect, useMemo, useState } from "react";
import { Card, Button, Row, Col, Drawer } from "antd";
import { CustomTable } from "../../custom-tables/CustomTable";
import { useQuery } from "@tanstack/react-query";
import {
  getAgencyOrderRequest,
} from "../../../Api";
import { useAuthChecker } from "../../../Context";
import { PAGE_SIZE, ProductSearchType, UserRoles, UserRolesEnum } from "../../../Constant";
import { SearchBar } from "../../search-product/SearchBar";
import { OrderForm } from "./common/OrderForm";
import { productOrderTablecolumns } from "./common/product-order-table-colums";
import { OrderView } from "./common/OrderView";
import { userMainRoleByUserRole } from "../../../lib";

export const ManageProductOrder = () => {
  const [isAddNewProduct, setIsAddNewProduct] = useState(false);
  const { user } = useAuthChecker();
  const [results, setResults] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState<any>(0);
  const [isOpenOrderItemView, setIsOpenOrderItemVie] = useState(false);

  const {
    data: purchaseData,
    refetch: OrderReFetch,
    isLoading: isLoadingOrderData,
  } = useQuery({
    queryKey: ["user_key_id", user?.user_key_id],
    queryFn: async () => {
      const offset = (currentPage - 1) * PAGE_SIZE;
      const res = await getAgencyOrderRequest(
        user?.user_key_id,
        PAGE_SIZE,
        offset
      );
      return res ?? [];
    },
    enabled: !!user?.user_key_id,
    refetchOnWindowFocus: false,
  });

  const finalData = useMemo(() => {
    return selectedItem.length > 0
      ? selectedItem
      : results.length > 0
      ? results
      : purchaseData?.orderingList;
  }, [selectedItem, results, purchaseData]);

  useEffect(() => {
    OrderReFetch();
  }, [currentPage]);


  const handleEdit = (orderId: any) => {
    console.log("Edit order:", orderId);
    // open form or modal to edit
  };
  
  const handleApprove = (orderId: any) => {
    console.log("Approve order:", orderId);
    // API call or logic
  };
  
  const handleDeliver = (orderId: any) => {
    console.log("Mark as delivered:", orderId);
    // API call or logic
  };
  

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card
            className="bg-white dark:bg-black border-none"
            title={
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-gray-100">
                  Manage Orders
                </span>
                {(user?.userRole === UserRolesEnum.agency_manager ||
                  user?.userRole === UserRolesEnum.agency) && (
                  <Button
                    type="primary"
                    onClick={() => setIsAddNewProduct(true)}
                  >
                    Add New Order
                  </Button>
                )}
              </div>
            }
            bordered
          >
            {/* Search Inputs */}
            <div className="flex mb-4 gap-x-4">
              <div className="w-[25vw]">
                <SearchBar
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  results={results}
                  setResults={setResults}
                  isSelectable={true}
                  placeHolder="Search order"
                  searchType={ProductSearchType.ORDER_LIST_BY_AGENCY_ID}
                />
              </div>
              <div className="w-[12vw]">
                <input
                  type="text"
                  placeholder="Barcode search"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-white"
                />
              </div>
            </div>

            {/* Product Table */}
            <div className="rounded-md border dark:border-gray-700">
              <CustomTable
                columns={productOrderTablecolumns(
                  user?.userRole,
                  setSelectedOrderId,
                  setIsOpenOrderItemVie
                )}
                totalItems={purchaseData?.totalItems ?? 0}
                pageSize={PAGE_SIZE}
                onFetchPage={(page) => setCurrentPage(page)}
                visibleData={finalData}
                isLoading={isLoadingOrderData}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Drawer for Add/Edit Product */}
      <Drawer
        title={`Add New Order`}
        width={"100vh"}
        placement={"right"}
        closable
        onClose={() => setIsAddNewProduct(false)}
        open={isAddNewProduct}
      >
        <OrderForm OrderReFetch={OrderReFetch} />
      </Drawer>

      <Drawer
        title={`View Order`}
        width={"100vh"}
        placement={"right"}
        closable
        onClose={() => setIsOpenOrderItemVie(false)}
        open={isOpenOrderItemView}
        footer={
          <div className="flex justify-end gap-2">
            {userMainRoleByUserRole(user?.userRole).isAgency && <Button onClick={() => handleEdit(selectedOrderId)}>Edit</Button>}
            <Button
              type="primary"
              onClick={() => handleApprove(selectedOrderId)}
            >
              Approve
            </Button>
            <Button
              type="default"
              onClick={() => handleDeliver(selectedOrderId)}
            >
              Delivered
            </Button>
          </div>
        }
      >
        <OrderView orderId={selectedOrderId} />
      </Drawer>
    </>
  );
};

import { useEffect, useMemo, useState } from "react";
import { Card, Button, Row, Col, Drawer } from "antd";
import { CustomTable } from "../../custom-tables/CustomTable";
import {
  mainColumns,
  stockColumns,
  subProductColumns,
} from "./common/product-table-column";
import { ProductForm } from "./common/manage-product";
import { useQuery } from "@tanstack/react-query";
import { getAgencyAllProduct } from "../../../Api";
import { useAuthChecker } from "../../../Context";
import { PAGE_SIZE, ProductSearchType, UserRolesEnum } from "../../../Constant";
import { SearchBar } from "../../search-product/SearchBar";

export const ManageProduct = () => {
  const [isAddNewProduct, setIsAddNewProduct] = useState(false);
  const { user } = useAuthChecker();
  const [results, setResults] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const {
    data: productData = [],
    refetch: productReFetch,
    isLoading: isLoadingProductData,
  } = useQuery({
    queryKey: ["user_key_id", user?.user_key_id],
    queryFn: async () => {
      const offset = (currentPage - 1) * PAGE_SIZE;
      const response = await getAgencyAllProduct(
        user.user_key_id,
        PAGE_SIZE,
        offset
      );
      setTotalItems(response?.totalItems);
      return response.productList || [];
    },
    enabled: !!user?.user_key_id,
    refetchOnWindowFocus: false,
  });

  const finalData = useMemo(() => {
    return selectedItem.length > 0
      ? selectedItem
      : results.length > 0
      ? results
      : productData;
  }, [selectedItem, results, productData]);

  useEffect(() => {
    productReFetch();
  }, [currentPage]);

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card
            className="bg-white dark:bg-black border-none"
            title={
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-gray-100">
                  Manage Product
                </span>
                {(user?.userRole === UserRolesEnum.head_office_manager ||
                  user?.userRole === UserRolesEnum.admin) && (
                  <Button
                    type="primary"
                    onClick={() => setIsAddNewProduct(true)}
                  >
                    Add New Product
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
                  searchType={ProductSearchType.ALL_PRODUCTS}
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
                columns={mainColumns}
                visibleData={finalData}
                isLoading={isLoadingProductData}
                totalItems={totalItems}
                pageSize={PAGE_SIZE}
                onFetchPage={(page) => setCurrentPage(page)}
                expandedRowRender={(record) => (
                  <CustomTable
                    columns={subProductColumns}
                    visibleData={record?.subProducts || []}
                    expandedRowRender={(sub) => (
                      <CustomTable
                        columns={stockColumns}
                        visibleData={Array.isArray(sub?.stock) ? sub.stock : []}
                      />
                    )}
                  />
                )}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Drawer for Add/Edit Product */}
      <Drawer
        title={`Manage Product`}
        width={"100vh"}
        placement={"right"}
        closable
        onClose={() => setIsAddNewProduct(false)}
        open={isAddNewProduct}
      >
        <ProductForm productReFetch={productReFetch} />
      </Drawer>
    </>
  );
};

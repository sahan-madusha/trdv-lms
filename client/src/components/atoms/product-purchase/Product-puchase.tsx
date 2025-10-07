import { useQuery } from "@tanstack/react-query";
import { useAuthChecker } from "../../../Context";
import { useState } from "react";
import { Button, Card, Col, Drawer, Row } from "antd";
import { UserRolesEnum } from "../../../Constant";
import { CustomTable } from "../../custom-tables/CustomTable";
import { PurchasingForm } from "./PurchaseForm";
import { ProductForm } from "../manage-product/common/manage-product";
import { getAllPurchase } from "../../../Api";
import { EyeOutlined, MailOutlined, PrinterOutlined } from "@ant-design/icons";

export const PurchasePoduct = () => {
  const [isAddNewPurchase, setIsAddNewPurchase] = useState<boolean>(false);
  const { user } = useAuthChecker();
  const [results, setResults] = useState<any[]>([]);
  const [isAddNewProduct, setIsAddNewProduct] = useState(false);

  const handleEdit = (record) => {
    console.log("Edit clicked", record);
  };

  const handleDelete = (record) => {
    console.log("Delete clicked", record);
  };

  const mainColumns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Invoice number",
      dataIndex: "invoice_number",
      key: "invoice_number",
      render: (text: string) => <span>{text}</span>,
    },

    {
      title: "Invoice Date",
      dataIndex: "invoice_date",
      key: "invoice_date",
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Total cost (Rs)",
      dataIndex: "total_cost",
      key: "total_cost",
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Total retail (Rs)",
      dataIndex: "total_retail",
      key: "total_retail",
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Total wholsale (Rs)",
      dataIndex: "total_wholsale",
      key: "total_wholsale",
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "created_date",
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            size="small"
            className="text-purple-600 border-purple-600"
            // onClick={() => handleSendEmail(record)}
          >
            <MailOutlined />
          </Button>
          <Button
            size="small"
            className="text-blue-600 border-blue-600"
            // onClick={() => handleView(record)}
          >
            <EyeOutlined />
          </Button>
          <Button
            size="small"
            className="text-green-600 border-green-600"
            //onClick={() => handlePrint(record)}
          >
            <PrinterOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const {
    data: purchaseData,
    refetch: purchaseReFetch,
    isLoading: isLoadingPurchaseData,
  } = useQuery<any>({
    queryKey: [""],
    queryFn: async () => {
      const res = await getAllPurchase();
      return res.purchasingList || [];
    },
    enabled: !!user?.user_key_id,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card
            className="bg-white dark:bg-black border-none"
            title={
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-gray-100">
                  Manage purchase
                </span>
                {user?.userRole == UserRolesEnum.head_office_manager ||
                  (user?.userRole == UserRolesEnum.admin && (
                    <Button
                      type="primary"
                      onClick={() => {
                        setIsAddNewPurchase(true);
                      }}
                    >
                      Add New purchase
                    </Button>
                  ))}
              </div>
            }
            bordered
          >
            <div className="rounded-md border dark:border-gray-700">
              <CustomTable
                columns={mainColumns}
                visibleData={purchaseData || []}
                isLoading={isLoadingPurchaseData}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Drawer
        title={
          <>
            <div className="flex justify-between">
              <span>Manage purchase</span>
              {(user?.userRole === UserRolesEnum.head_office_manager ||
                user?.userRole === UserRolesEnum.admin) && (
                <Button type="primary" onClick={() => setIsAddNewProduct(true)}>
                  Add New Product
                </Button>
              )}
            </div>
          </>
        }
        width={"100vh"}
        placement={"right"}
        className=""
        closable={true}
        onClose={() => {
          setIsAddNewPurchase(false);
        }}
        open={isAddNewPurchase}
      >
        <PurchasingForm purchaseReFetch={purchaseReFetch} />
      </Drawer>

      <Drawer
        title={`Manage Product`}
        width={"100vh"}
        placement={"right"}
        closable
        onClose={() => setIsAddNewProduct(false)}
        open={isAddNewProduct}
      >
        <ProductForm />
      </Drawer>
    </>
  );
};

import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const stockColumns = [
  {
    title: "Stock ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Expire date",
    dataIndex: "expiredate",
    key: "expiredate",
  },
  {
    title: "Quantity",
    dataIndex: "qty",
    key: "qty",
    render: (qty: number) => <span>{qty}</span>,
  },
  {
    title: "Retail",
    dataIndex: "retailPrice",
    key: "retailPrice",
    render: (retail: number) => <span>{retail}</span>,
  },
  {
    title: "Wholesale",
    dataIndex: "wholesale",
    key: "wholesale",
    render: (whlsale: number) => <span>{whlsale}</span>,
  },
];

export const subProductColumns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Sub-Product",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: "Weight",
    dataIndex: "weight",
    key: "weight",
  },
  {
    title: "Barcode",
    dataIndex: "barcode",
    key: "barcode",
  },
];

export const categoryFilters = [
  ...new Set([1, 1].map((p: any) => p.category)),
].map((cat) => ({
  text: cat,
  value: cat,
}));

export const mainColumns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Main Product",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <span>{text}</span>,
  },

  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    filters: categoryFilters,
    onFilter: (value, record) => record.category === value,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => (
      <>
        <div className="flex gap-2">
          <Button
            size="small"
            className="text-green-600 border-green-600"
            //onClick={() => setSelectedUser(record)}
          >
            <UserAddOutlined />
          </Button>
          <Button
            size="small"
            className="text-blue-600 border-blue-600"
            // onClick={() => handleDelete(record)}
          >
            <EditOutlined />
          </Button>
        </div>
      </>
    ),
  },
];

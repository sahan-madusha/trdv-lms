import {
  getOrderStatusTag,
  truncate,
  userMainRoleByUserRole,
} from "../../../../lib";
import { EditOutlined, EyeOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

export const productOrderTablecolumns = (
  userRole,
  setSelectedOrderId,
  setIsOpenOrderItemVie
) => {
  return [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      className: "text-gray-900 dark:text-gray-100 font-medium",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    ...(userMainRoleByUserRole(userRole).isAdmin
      ? [
          {
            title: "Agency name",
            dataIndex: "agencyname",
            key: "agencyname",
            className: "text-gray-800 dark:text-gray-200",
          },
        ]
      : []),
    {
      title: "date",
      dataIndex: "date",
      key: "date",
      className: "text-gray-800 dark:text-gray-200",
    },
    {
      title: "updatedDate",
      dataIndex: "updatedDate",
      key: "updatedDate",
      className: "text-gray-800 dark:text-gray-200",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (text) => {
        return (
          <Tooltip title={text}>
            <span>{truncate(text, 10)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      //filters: roleFilters,
      onFilter: (value, record) => record.status === value,
      className: "text-gray-800 dark:text-gray-200",
      render: (status) => (
        getOrderStatusTag(status)
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Tooltip title="Assign User">
            <Button
              size="small"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-500 hover:text-green-600 hover:border-green-600 dark:hover:text-green-400 dark:hover:border-green-400 transition-colors"
              onClick={() => {
                setSelectedOrderId(record?.id);
                setIsOpenOrderItemVie(true);
              }}
            >
              <EyeOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Assign User">
            <Button
              size="small"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-500 hover:text-green-600 hover:border-green-600 dark:hover:text-green-400 dark:hover:border-green-400 transition-colors"
              //onClick={() => setSelectedUser(record)}
            >
              <UserAddOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Edit User">
            <Button
              size="small"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-500 hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-400 dark:hover:border-blue-400 transition-colors"
              //onClick={() => handleDelete(record)}
            >
              <EditOutlined />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];
};

export const productOrderView = () => {
  return [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Requested Quantity",
      dataIndex: "requested_qty",
      key: "requested_qty",
    },
    {
      title: "Approved Quantity",
      dataIndex: "approved_qty",
      key: "approved_qty",
    },
    {
      title: "Available Quantity",
      dataIndex: "available_qty",
      key: "available_qty",
    },
  ];
};

import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

export const employeeTablecolumns = (setSelectedUser, handleDelete) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "text-gray-900 dark:text-gray-100 font-medium",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "text-gray-800 dark:text-gray-200",
    },
    {
      title: "Contact number",
      dataIndex: "contact",
      key: "contact",
      className: "text-gray-800 dark:text-gray-200",
    },
    {
      title: "User key Id",
      dataIndex: "user_key_id",
      key: "user_key_id",
      className: "text-gray-800 dark:text-gray-200 font-mono text-sm",
      ellipsis: {
        showTitle: false,
      },
      render: (id) => (
        <Tooltip placement="topLeft" title={id}>
          {id}
        </Tooltip>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      //filters: roleFilters,
      onFilter: (value, record) => record.role === value,
      className: "text-gray-800 dark:text-gray-200",
      render: (role) => (
        <span className={`px-2 py-1 rounded-md text-xs`}>{role}</span>
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
              onClick={() => setSelectedUser(record)}
            >
              <UserAddOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Edit User">
            <Button
              size="small"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-500 hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-400 dark:hover:border-blue-400 transition-colors"
              onClick={() => handleDelete(record)}
            >
              <EditOutlined />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];
};

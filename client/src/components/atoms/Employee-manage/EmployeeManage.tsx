import { useEffect, useMemo, useState } from "react";
import {
  AddNewEmployee,
  getEmployeeListBaseOnUsersId,
  getUserRoleBaseOnUsersRole,
} from "../../../Api";
import {
  PAGE_SIZE,
  ProductSearchType,
  UserRoles,
  UserRolesEnum,
} from "../../../Constant";
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Spin,
  Drawer,
  Tooltip,
  message,
} from "antd";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthChecker } from "../../../Context";
import { CustomTable } from "../../custom-tables/CustomTable";
import { UserAccessManage } from "./common/user-access-manage";
import { employeeTablecolumns } from "./common/employees-table-column";
import { SearchBar } from "../../search-product/SearchBar";

const { Option } = Select;
interface EmployeeManageProps {
  userRole: UserRoles;
  setSelectedUser: (id: any) => void;
}

interface EmployeeQueryResult {
  isDataSet: boolean;
  employeeList: any[];
}

interface UserRoleQueryResult {
  isDataSet: boolean;
  userRoleData: any[];
}

export const EmployeeManage = ({ userRole }) => {
  const [form] = Form.useForm();
  const { user } = useAuthChecker();
  const [userRoleData, setUserRoleData] = useState<any>([]);
  const [employeeData, setEmployeeData] = useState<any>([]);
  const [isAddNewEmployee, setIsAddNewEmployee] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [results, setResults] = useState<any[]>([]);

  const getTitle = (role: UserRoles) =>
    role == UserRolesEnum.admin
      ? "System user / agency"
      : "employee / Sales person";

  //API
  const { isLoading: isLoadingUserRole } = useQuery<UserRoleQueryResult>({
    queryKey: ["userRole", userRole],
    queryFn: async () => {
      const res = await getUserRoleBaseOnUsersRole(userRole);
      if (res?.isDataSet) {
        setUserRoleData(res?.userRoleData || []);
      }
      return res;
    },
    enabled: !!userRole,
    refetchOnWindowFocus: false,
  });

  const { refetch: employeeReFetch, isLoading: isLoadingEmployeeData } =
    useQuery<EmployeeQueryResult>({
      queryKey: ["userId", user?.userId],
      queryFn: async () => {
        const offset = (currentPage - 1) * PAGE_SIZE;
        const res = await getEmployeeListBaseOnUsersId(
          user?.userId,
          PAGE_SIZE,
          offset
        );
        if (res?.isDataSet) {
          setEmployeeData(res?.employeeList || []);
          setTotalItems(res?.totalItems || 0);
        }
        return res;
      },
      enabled: !!userRole,
      refetchOnWindowFocus: false,
    });

  const { mutate: addEmployeeMutation, isPending: isAddingEmployee } =
    useMutation({
      mutationFn: async (values: any) => {
        const data = {
          ...values,
          user_key_id: user?.user_key_id,
        };
        return await AddNewEmployee(data);
      },
      onSuccess: (res) => {
        if (res?.isDataAdded) {
          message.success(res?.msg);
          form.resetFields();
          employeeReFetch();
          setIsAddNewEmployee(false);
        } else {
          message.error(res?.msg);
        }
      },
      onError: (error) => {
        console.error("Add Employee Error:", error);
        message.error("An error occurred while adding the employee.");
      },
    });

  const finalData = useMemo(() => {
    return selectedItem.length > 0
      ? selectedItem
      : results.length > 0
      ? results
      : employeeData;
  }, [selectedItem, results, employeeData]);

  useEffect(() => {
    employeeReFetch();
  }, [currentPage]);

  const handleDelete = () => {
    console.log("handleDelete");
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
                  List of{" "}
                  {userRole === UserRolesEnum.admin
                    ? "System users & Agency"
                    : "Agency employee & Sales person"}
                </span>
                <Button
                  type="primary"
                  onClick={() => {
                    setIsAddNewEmployee(true);
                  }}
                >
                  Add New Employee
                </Button>
              </div>
            }
            bordered={false}
          >
            <div className="relative w-[25vw] mb-5">
              <div className="w-[25vw]">
                <SearchBar
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  results={results}
                  setResults={setResults}
                  isSelectable={true}
                  placeHolder="Search employee"
                  searchType={ProductSearchType.EMPLOYEE_LIST_BY_ROLE_AND_NAME}
                />
              </div>
            </div>

            <div className="rounded-md border dark:border-gray-700">
              <CustomTable
                rowClassName={(record: any) =>
                  record.uid == null ? "!dark:bg-gray-600" : ""
                }
                totalItems={totalItems}
                columns={employeeTablecolumns(setSelectedUser, handleDelete)}
                visibleData={finalData}
                isLoading={isLoadingEmployeeData}
                pageSize={PAGE_SIZE}
                onFetchPage={(page) => setCurrentPage(page)}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Drawer
        title={`${getTitle(userRole)}`}
        placement={"right"}
        className=""
        closable={true}
        onClose={() => {
          setIsAddNewEmployee(false);
        }}
        open={isAddNewEmployee}
      >
        {isLoadingUserRole ? (
          <div className="h-screen flex justify-center items-center align-middle">
            <Spin />
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={addEmployeeMutation}
            autoComplete="off"
          >
            <div className=" w-full ">
              <Form.Item
                className="w-full"
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>

              <Form.Item
                className="w-full"
                label="Employee / Agency Id"
                name="employeeid"
                rules={[{ required: true, message: "Please enter id" }]}
              >
                <Input placeholder="Enter employee / agency id" />
              </Form.Item>
            </div>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter email",
                },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <div className="flex justify-between w-full space-x-4">
              <Form.Item
                className="w-full"
                label="Contact Number"
                name="contact"
                rules={[
                  {
                    required: true,
                    message: "Please enter a contact number",
                  },
                ]}
              >
                <Input placeholder="Enter contact number" />
              </Form.Item>

              <Form.Item
                className="w-full"
                label="User Role"
                name="role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select placeholder="Select a role">
                  {userRoleData?.map((data, index) => (
                    <Option key={index} value={data?.id}>
                      {data?.role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input.TextArea placeholder="Enter address" />
            </Form.Item>

            <Form.Item>
              <Button
                loading={isAddingEmployee}
                type="primary"
                htmlType="submit"
                block
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>

      <Drawer
        title={`System user`}
        placement={"right"}
        width={"w-full"}
        closable={true}
        onClose={() => {
          setSelectedUser(null);
        }}
        open={!!selectedUser}
      >
        <UserAccessManage
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </Drawer>
    </>
  );
};

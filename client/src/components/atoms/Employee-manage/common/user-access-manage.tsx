import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Checkbox, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getAllAppFeature, ManageUser } from "../../../../Api";
import { LoadingScreen } from "../../../LoadingScreen/LoadingScreen";
import { useMutation, useQuery } from "@tanstack/react-query";

interface fetturesQueryResult {
  isDataSet: boolean;
  features: any[];
  userData: any;
}
export const UserAccessManage: React.FC<any> = ({
  selectedUser,
  setSelectedUser,
}) => {
  const [form] = Form.useForm();
  const [appFeature, setAppFeature] = useState<any[]>([]);

  //API
  const { data: fetureQueryData, isLoading: isLoadingFeture } =
    useQuery<fetturesQueryResult>({
      queryKey: ["user_key_id", selectedUser?.user_key_id],
      queryFn: async () => {
        return await getAllAppFeature(selectedUser?.user_key_id);
      },
      enabled: !!selectedUser?.user_key_id,
      refetchOnWindowFocus: false,
    });

  const { mutate: handleSubmit, isPending: isAddingUser } = useMutation({
    mutationFn: async (values: any) => {
      const selectedFeatureIds = appFeature.flatMap((group) =>
        group.features.filter((f) => f.isSelected).map((f) => f.id)
      );

      const payload = {
        ...values,
        role: selectedUser?.role,
        access: selectedFeatureIds,
        user_key_id: selectedUser?.user_key_id,
      };
      return await ManageUser(payload);
    },
    onSuccess: (res) => {
      if (res?.isDataAdded) {
        setSelectedUser(null)
        message.success(res?.msg);
      } else {
        message.error(res?.msg);
      }
    },
    onError: (error) => {
      console.error("Add Employee Error:", error);
      message.error("An error occurred while adding the employee.");
    },
  });

  const handleCheckboxChange = (
    categoryIndex: number,
    featureIndex: number,
    checked: boolean
  ) => {
    const updatedFeatures = [...appFeature];
    updatedFeatures[categoryIndex].features[featureIndex].isSelected = checked;
    setAppFeature(updatedFeatures);
  };

  useEffect(() => {
    if (fetureQueryData?.isDataSet) {
      setAppFeature(fetureQueryData?.features || []);
      form.setFieldsValue({
        username: fetureQueryData?.userData?.username,
        password: fetureQueryData?.userData?.password,
      });
    }
  }, [fetureQueryData]);

  return (
    <>
      {isLoadingFeture && selectedUser != null ? (
        <LoadingScreen messageQueue="loading..." />
      ) : (
        <Card>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <div className="flex align-bottom items-end gap-4 flex-wrap">
              <Form.Item
                label="Username"
                name="username"
                className="min-w-[250px]"
                rules={[
                  { required: true, message: "Please input a username!" },
                ]}
              >
                <Input placeholder="Enter username" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                className="min-w-[250px]"
                rules={[
                  { required: true, message: "Please input a password!" },
                  {
                    validator: (_, value) =>
                      value && value.length < 4
                        ? Promise.reject(
                            new Error("Password must be at least 4 characters")
                          )
                        : Promise.resolve(),
                  },
                ]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </div>

            <Form.Item name="access">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-3">
                {appFeature?.map((group, catIndex) => (
                  <div key={group.category}>
                    <p className="font-medium mb-2">{group.category}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {group.features.map((feature, featIndex) => (
                        <Checkbox
                          key={feature.id}
                          value={feature.id}
                          disabled={feature.is_locked}
                          checked={feature.isSelected}
                          onChange={(e) =>
                            handleCheckboxChange(
                              catIndex,
                              featIndex,
                              e.target.checked
                            )
                          }
                        >
                          {feature.label}
                        </Checkbox>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Form.Item>

            <Form.Item className="float-end">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoadingFeture || isAddingUser}
              >
                Save Access
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </>
  );
};

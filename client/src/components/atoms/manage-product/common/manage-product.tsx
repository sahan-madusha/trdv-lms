import React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Collapse,
  Space,
  Divider,
  message,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { ManagepProducts } from "../../../../Api";
import { useAuthChecker } from "../../../../Context";
import { useMutation } from "@tanstack/react-query";

const { Panel } = Collapse;

export const ProductForm = ({productReFetch}:{productReFetch?:any}) => {
  const [form] = Form.useForm();
  const { user } = useAuthChecker();

  const { mutate: addProductMutation, isPending: isAddingProduct } =
    useMutation({
      mutationFn: async (values: any) => {
        const data = {
          ...values,
          userId: user?.userId,
        };
        return await ManagepProducts(data);
      },
      onSuccess: (res) => {
        if (res?.isDataAdded) {
          message.success(res?.msg);
          form.resetFields();
          productReFetch && productReFetch();
        } else {
          message.error(res?.msg);
        }
      },
      onError: (error) => {
        console.error("Add Employee Error:", error);
        message.error("An error occurred while adding the employee.");
      },
    });

  return (
    <div className="bg-white">
      <Form
        form={form}
        layout="vertical"
        onFinish={addProductMutation}
        initialValues={{ subProducts: [] }}
      >
        <div className="flex w-full gap-x-1">
          <Form.Item
            className="w-full"
            label="Product Name"
            name="productName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            className="w-full"
            label="Category"
            name="category_id"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter category" />
          </Form.Item>
        </div>
        <div className="flex w-full gap-x-1">
          <Form.Item
            className="w-full"
            label="Units"
            name="units_id"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter category" />
          </Form.Item>

          <Form.Item
            className="w-full"
            label="Brand name"
            name="brand_name_id"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter category" />
          </Form.Item>
          <Form.Item
            className="w-full"
            label="SKU Code"
            name="sku"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter SKU" />
          </Form.Item>
        </div>
        <Form.List name="subProducts">
          {(subFields, { add: addSub, remove: removeSub }) => (
            <>
              {subFields.map(({ key, name, ...restField }) => (
                <Collapse key={key} className="mb-4">
                  <Panel
                    header={`Sub-Product ${name + 1}`}
                    extra={
                      <MinusCircleOutlined
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSub(name);
                        }}
                      />
                    }
                    key={""}
                  >
                    <div className="flex w-full gap-x-1">
                      <Form.Item
                        {...restField}
                        label="Code"
                        className="w-full"
                        name={[name, "code"]}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Enter sub-product code" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        className="w-full"
                        label="Barcode"
                        name={[name, "barcode"]}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Enter barcode" />
                      </Form.Item>
                    </div>

                    <Form.List name={[name, "stocks"]}>
                      {(
                        stockFields,
                        { add: addStock, remove: removeStock }
                      ) => (
                        <>
                          {stockFields.map((field, index) => (
                            <Space
                              key={field.key}
                              className="flex flex-wrap my-0 items-center"
                              align="baseline"
                              size="middle"
                            >
                              <Form.Item
                                label="Expire Date"
                                name={[field.name, "expireDate"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Expire date is required",
                                  },
                                ]}
                              >
                                <DatePicker format="YYYY-MM-DD" />
                              </Form.Item>
                              <Form.Item
                                label="Quantity"
                                name={[field.name, "qty"]}
                                rules={[{ required: true }]}
                              >
                                <InputNumber min={1} />
                              </Form.Item>
                              <Form.Item
                                label="Cost"
                                name={[field.name, "cost"]}
                                rules={[{ required: true }]}
                              >
                                <InputNumber min={0} step={0.01} />
                              </Form.Item>
                              <Form.Item
                                label="Retail"
                                name={[field.name, "retailPrice"]}
                              >
                                <InputNumber min={0} step={0.01} />
                              </Form.Item>
                              <Form.Item
                                label="Wholesale"
                                name={[field.name, "wholesalePrice"]}
                              >
                                <InputNumber min={0} step={0.01} />
                              </Form.Item>

                              <MinusCircleOutlined
                                onClick={() => removeStock(field.name)}
                                className="text-red-500"
                              />
                            </Space>
                          ))}
                          <Form.Item>
                            <Button
                              className="float-end"
                              type="dashed"
                              onClick={() => addStock()}
                              icon={<PlusOutlined />}
                            >
                              Add Stock
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Panel>
                </Collapse>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => addSub()}
                  icon={<PlusOutlined />}
                  block
                >
                  Add Sub-Product
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Divider />

        <Form.Item>
          <Button
            className="float-end"
            type="primary"
            htmlType="submit"
            loading={isAddingProduct}
          >
            Submit Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
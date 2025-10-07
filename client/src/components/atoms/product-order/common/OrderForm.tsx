import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Select,
  InputNumber,
  Form,
  Table,
  Collapse,
  Popconfirm,
  message,
} from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { useAuthChecker } from "../../../../Context";
import { AddNewOrder } from "../../../../Api";
import { SearchBar } from "../../../search-product/SearchBar";
import TextArea from "antd/es/input/TextArea";
import { ProductSearchType } from "../../../../Constant";

const { Option } = Select;
const { Panel } = Collapse;

export const OrderForm = ({ OrderReFetch }: { OrderReFetch: any }) => {
  const [form] = Form.useForm();
  const { user } = useAuthChecker();
  const [orderingItems, setOrderingItems] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>([]);
  const [selectedSubProduct, setSelectedSubProduct] = useState<any>(null);

  const handleAddItem = async () => {
    try {
      const values = await form.validateFields([
        "productId",
        "productName",
        "subCode",
        "quantity",
      ]);

      if (!selectedSubProduct) {
        message.error("Please select a valid Sub Code.");
        return;
      }

      const newItem = {
        productId: values.productId,
        productName: values.productName,
        subCode: values.subCode,
        req_quantity: Number(values.quantity || 1),
      };

      setOrderingItems((prev) => [...prev, newItem]);

      form.resetFields(["subCode", "quantity"]);
      setSelectedSubProduct(null);
    } catch {
      message.error("Please fill all required fields before adding an item.");
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItems = orderingItems.filter((_, idx) => idx !== index);
    setOrderingItems(newItems);
    message.success("Item removed successfully!");
  };

  const handleClearItems = () => {
    setOrderingItems([]);
    message.success("All items cleared!");
  };

  const { mutate: handleSubmit, isPending: isAddingOrderingItems } =
    useMutation({
      mutationFn: async () => {
        const values = await form.validateFields(["note"]);

        const orderingData = {
          note: values.note,
          userId: user?.userId,
          items: orderingItems,
        };
        return await AddNewOrder(orderingData);
      },
      onSuccess: (res) => {
        if (res?.isDataAdded) {
          message.success(res?.msg);
          form.resetFields();
          setSelectedItem([]);
          setOrderingItems([]);
          OrderReFetch && OrderReFetch();
        } else {
          message.error(res?.msg);
        }
      },
      onError: (error) => {
        console.error("Add Employee Error:", error);
        message.error("An error occurred while adding the employee.");
      },
    });

  useEffect(() => {
    if (selectedItem.length > 0) {
      form.setFieldsValue({ productName: selectedItem[0].name });
      form.setFieldsValue({ productId: selectedItem[0].id });
    }
  }, [selectedItem]);

  const columns = [
    { title: "Product", dataIndex: "productName", key: "productName" },
    { title: "Sub", dataIndex: "subCode", key: "subCode" },
    { title: "Requested qty", dataIndex: "req_quantity", key: "req_quantity" },
    {
      title: "Action",
      key: "action",
      render: (_: any, __: any, index: number) => (
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => handleRemoveItem(index)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger icon={<MinusCircleOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-1">
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <div className="flex justify-between w-full gap-x-1">
          <div className="w-full">
            <label htmlFor="">Product name</label>
            <div className="mt-2">
              <SearchBar
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                results={results}
                setResults={setResults}
                isSelectable={true}
                searchType={ProductSearchType.ALL_PRODUCTS}
              />
            </div>
            <Form.Item name="productName" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="productId" hidden>
              <Input />
            </Form.Item>
          </div>

          <Form.Item label="Sub Code" name="subCode" className="w-full">
            <Select
              placeholder="Select sub code"
              onChange={(value) => {
                const sub = selectedItem[0]?.subProducts?.find(
                  (s) => s.id === value
                );
                setSelectedSubProduct(sub);
              }}
              className="w-full"
            >
              {selectedItem[0]?.subProducts?.map((sub, index) => (
                <Option key={`subcode-${index}`} value={sub.id}>
                  {`${sub.barcode} | ${sub.weight}`}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            className="w-full"
            initialValue={1}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>
        </div>

        <div className="flex justify-between w-full gap-x-1"></div>

        <Form.Item>
          <Button
            type="default"
            onClick={handleAddItem}
            className="w-100 text-white float-end bg-blue-600 hover:bg-blue-700"
          >
            Add Item
          </Button>
        </Form.Item>

        <Collapse defaultActiveKey={["1"]} className="mb-6">
          <Panel
            key="1"
            header={
              <div className="flex justify-between w-full">
                <span>Ordering Items</span>
                <Popconfirm
                  title="Are you sure to clear all items?"
                  onConfirm={handleClearItems}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger icon={<MinusCircleOutlined />} />
                </Popconfirm>
              </div>
            }
          >
            <Table
              columns={columns}
              dataSource={orderingItems}
              rowKey={(record, index) => index.toString()}
              pagination={false}
            />
          </Panel>
        </Collapse>

        <div className="flex justify-between w-full gap-x-1">
          <Form.Item
            label="Note"
            name="note"
            className="w-full"
            rules={[{ required: true, message: "Please add a note" }]}
          >
            <TextArea className="w-full" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            loading={isAddingOrderingItems}
            disabled={orderingItems.length === 0}
            type="primary"
            htmlType="submit"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Submit Order
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

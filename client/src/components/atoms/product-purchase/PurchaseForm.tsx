import React, { useState, useEffect, useMemo } from "react";
import {
  Input,
  Button,
  DatePicker,
  Select,
  InputNumber,
  Form,
  Table,
  Collapse,
  Popconfirm,
  message,
} from "antd";
import moment from "moment";
import { MinusCircleOutlined } from "@ant-design/icons";
import { SearchBar } from "../../search-product/SearchBar";
import { useAuthChecker } from "../../../Context/useAuthContext";
import { AddNewPuchasing } from "../../../Api";
import { useMutation } from "@tanstack/react-query";
import { ProductSearchType } from "../../../Constant";

const { Option } = Select;
const { Panel } = Collapse;

export const PurchasingForm = ({
  purchaseReFetch,
}: {
  purchaseReFetch?: any;
}) => {
  const [form] = Form.useForm();
  const { user } = useAuthChecker();
  const [purchasingItems, setPurchasingItems] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>([]);
  const [selectedSubProduct, setSelectedSubProduct] = useState<any>(null);

  const handleAddItem = async () => {
    try {
      const values = await form.validateFields([
        "productId",
        "productName",
        "subCode",
        "stockOption",
        "quantity",
        "costPrice",
        "retailPrice",
        "wholesalePrice",
      ]);

      if (!selectedSubProduct) {
        message.error("Please select a valid Sub Code.");
        return;
      }

      const newItem = {
        ...values,
        totalAmount:
          Number(values.costPrice || 0) * Number(values.quantity || 1),
      };

      setPurchasingItems((prev) => [...prev, newItem]);

      form.resetFields([
        "productId",
        "subCode",
        "stockOption",
        "quantity",
        "costPrice",
        "retailPrice",
        "wholesalePrice",
      ]);
      setSelectedSubProduct(null);
    } catch {
      message.error("Please fill all required fields before adding an item.");
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItems = purchasingItems.filter((_, idx) => idx !== index);
    setPurchasingItems(newItems);
    message.success("Item removed successfully!");
  };

  const handleClearItems = () => {
    setPurchasingItems([]);
    message.success("All items cleared!");
  };

  const { mutate: handleSubmit, isPending: isAddingPurchasingItems } =
    useMutation({
      mutationFn: async () => {
        const values = await form.validateFields([
          "invoiceNumber",
          "invoicingDate",
        ]);

        const purchaseData = {
          invoiceNumber: values.invoiceNumber,
          invoicingDate: values.invoicingDate.format("YYYY-MM-DD"),
          userId: user?.userId,
          total_cost: formattedTotalAmounts?.cost,
          total_retail: formattedTotalAmounts?.retail,
          total_wholsale: formattedTotalAmounts?.wholesale,
          items: purchasingItems,
        };
        return await AddNewPuchasing(purchaseData);
      },
      onSuccess: (res) => {
        if (res?.isDataAdded) {
          message.success(res?.msg);
          form.resetFields();
          setSelectedItem([]);
          setPurchasingItems([]);
          purchaseReFetch && purchaseReFetch();
        } else {
          message.error(res?.msg);
        }
      },
      onError: (error) => {
        console.error("Add Employee Error:", error);
        message.error("An error occurred while adding the employee.");
      },
    });

  const totalAmounts = useMemo(() => {
    return purchasingItems.reduce(
      (totals, item) => {
        const quantity = Number(item.quantity || 1);
        totals.cost += Number(item.costPrice || 0) * quantity;
        totals.retail += Number(item.retailPrice || 0) * quantity;
        totals.wholesale += Number(item.wholesalePrice || 0) * quantity;
        return totals;
      },
      { cost: 0, retail: 0, wholesale: 0 }
    );
  }, [purchasingItems]);

  const formattedTotalAmounts = {
    cost: totalAmounts.cost.toFixed(2),
    retail: totalAmounts.retail.toFixed(2),
    wholesale: totalAmounts.wholesale.toFixed(2),
  };

  useEffect(() => {
    if (selectedItem.length > 0) {
      form.setFieldsValue({ productName: selectedItem[0].name });
      form.setFieldsValue({ productId: selectedItem[0].id });
    }
  }, [selectedItem]);

  const columns = [
    { title: "Product", dataIndex: "productName", key: "productName" },
    { title: "Sub", dataIndex: "subCode", key: "subCode" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Cost", dataIndex: "costPrice", key: "costPrice" },
    { title: "Retail", dataIndex: "retailPrice", key: "retailPrice" },
    { title: "Wholesale", dataIndex: "wholesalePrice", key: "wholesalePrice" },
    { title: "Total", dataIndex: "totalAmount", key: "totalAmount" },
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
            label="Stock"
            name="stockOption"
            className="w-full"
            initialValue="existing"
          >
            <Select
              className="w-full"
              onChange={(value) => {
                if (value === "0") {
                  form.setFieldsValue({
                    costPrice: null,
                    retailPrice: null,
                    wholesalePrice: null,
                  });
                  return;
                }

                const selectedStock = selectedSubProduct?.stock?.find(
                  (s) => s.id === value
                );
                if (selectedStock) {
                  form.setFieldsValue({
                    costPrice: Number(selectedStock.costPrice || 0),
                    retailPrice: Number(selectedStock.retailPrice || 0),
                    wholesalePrice: Number(selectedStock.wholesale || 0),
                    quantity: Number(selectedStock.qty || 0),
                  });
                }
              }}
            >
              {selectedSubProduct?.stock?.map((stock, index) => (
                <Option key={`stock-${index}`} value={stock.id}>
                  {`Retail:${stock.retailPrice} | Qty:${stock.qty}`}
                </Option>
              ))}
              <Option value="0">Add as New Stock</Option>
            </Select>
          </Form.Item>
        </div>

        {selectedSubProduct?.stock?.length > 0 && (
          <div className="bg-gray-100 p-2 rounded-md mb-2 text-sm">
            {selectedSubProduct.stock.map((s, idx) => (
              <div
                key={idx}
                className="flex justify-between border-b py-1 text-gray-700"
              >
                <span>Expire: {moment(s.expiredate).format("YYYY-MM-DD")}</span>
                <span>Qty: {s.qty}</span>
                <span>Retail: ${s.retailPrice}</span>
                <span>Wholesale: ${s.wholesale}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between w-full gap-x-1">
          <Form.Item
            label="Quantity"
            name="quantity"
            className="w-full"
            initialValue={1}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          <Form.Item label="Cost Price" name="costPrice" className="w-full">
            <InputNumber step={0.01} className="w-full" />
          </Form.Item>
          <Form.Item label="Retail Price" name="retailPrice" className="w-full">
            <InputNumber step={0.01} className="w-full" />
          </Form.Item>
          <Form.Item
            label="Wholesale Price"
            name="wholesalePrice"
            className="w-full"
          >
            <InputNumber step={0.01} className="w-full" />
          </Form.Item>
        </div>

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
                <span>Purchasing Items</span>
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
              dataSource={purchasingItems}
              rowKey={(record, index) => index.toString()}
              pagination={false}
            />
            <div className="text-right font-medium mt-4 space-y-1">
              <div>Total Cost: ${formattedTotalAmounts.cost}</div>
              <div>Total Retail: ${formattedTotalAmounts.retail}</div>
              <div>Total Wholesale: ${formattedTotalAmounts.wholesale}</div>
            </div>
          </Panel>
        </Collapse>

        <div className="flex justify-between w-full gap-x-1">
          <Form.Item
            label="Invoice Number"
            name="invoiceNumber"
            className="w-full"
            rules={[
              { required: true, message: "Please add an invoice number" },
            ]}
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            label="Invoicing Date"
            name="invoicingDate"
            className="w-full"
            rules={[{ required: true, message: "Please add an invoice date" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            loading={isAddingPurchasingItems}
            disabled={purchasingItems.length === 0}
            type="primary"
            htmlType="submit"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Submit Purchase
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

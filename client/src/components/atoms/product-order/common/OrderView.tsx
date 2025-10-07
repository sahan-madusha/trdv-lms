import React, { useState } from "react";
import { Card, Descriptions, Table, Tag } from "antd";
import { useAuthChecker } from "../../../../Context";
import { getOrderRequestItemsListByOrderId } from "../../../../Api";
import { useQuery } from "@tanstack/react-query";
import { productOrderView } from "./product-order-table-colums";
import { LoadingScreen } from "../../..";
import { getOrderStatusTag } from "../../../../lib";

export const OrderView = ({ orderId }: { orderId: any }) => {
  const { user } = useAuthChecker();
  const [orderingList, setOrderingList] = useState<any>(null);
  const [orderingItemList, setOrderingItemList] = useState<any[]>([]);

  const { refetch: OrderItemReFetch, isLoading: isLoadingOrderItemData } =
    useQuery({
      queryKey: ["user_key_id", user?.user_key_id, orderId],
      queryFn: async () => {
        const res = await getOrderRequestItemsListByOrderId(
          user?.user_key_id,
          orderId
        );

        setOrderingList(res?.orderingList);
        setOrderingItemList(res?.orderingItemList || []);
        return res ?? [];
      },
      enabled: !!user?.user_key_id && !!orderId,
      refetchOnWindowFocus: false,
    });

  if (isLoadingOrderItemData || !orderingList) {
    return (
      <div className="w-screen">
        <LoadingScreen messageQueue={"Loading..."} />
      </div>
    );
  }

  return (
    <div>
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Order ID">
          # {orderingList.id}
        </Descriptions.Item>
        <Descriptions.Item label="Agency">
          {orderingList.agencyname}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {getOrderStatusTag(orderingList.status)}
        </Descriptions.Item>
        <Descriptions.Item label="Date">{orderingList.date}</Descriptions.Item>
        <Descriptions.Item label="Last Updated">
          {orderingList.updatedDate}
        </Descriptions.Item>
       
        <Descriptions.Item label="Note">{orderingList.note}</Descriptions.Item>
      </Descriptions>

      <Table
      className="mt-5"
        dataSource={orderingItemList.map((item, index) => ({
          ...item,
          key: index,
        }))}
        columns={productOrderView()}
        pagination={false}
        bordered
      />
    </div>
  );
};

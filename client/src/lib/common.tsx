import { Tag } from "antd";

export const getOrderStatusTag = (status: string) => {
  const statusMap: { [key: string]: { color: string; label: string } } = {
    request: { color: "orange", label: "Request" },
    approved: { color: "green", label: "Approved" },
    rejected: { color: "red", label: "Rejected" },
    recived: { color: "blue", label: "Received" },
  };

  const { color, label } = statusMap[status] || {
    color: "gray",
    label: status || "Unknown",
  };

  return (
    <Tag color={color} className="capitalize">
      {label}
    </Tag>
  );
};

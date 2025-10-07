import React from "react";
import { LockOutlined } from "@ant-design/icons";
export const NoAccessScreen: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center  text-blue-600 px-4 text-center">
      <LockOutlined style={{ fontSize: 60, color: "#f87171" }} />
      <h1 className="text-3xl font-bold mt-4">Access Denied</h1>
      <p className="text-blue-400 max-w-md mt-2">
        You don't have permission to view this page. Please contact your
        administrator or try logging in with a different account.
      </p>
    </div>
  );
};

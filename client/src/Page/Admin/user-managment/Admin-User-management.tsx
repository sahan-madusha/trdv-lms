import React, { useState } from "react";
import { usePagePermission } from "../../../Hook";
import { AppFeature, UserRolesEnum } from "../../../Constant";
import {
  EmployeeManage,
  LoadingScreen,
  NoAccessScreen,
  UserAccessManage,
} from "../../../components";

export const AdminUserManagmentPage = () => {
  const { isLoading, hasPermission } = usePagePermission(AppFeature.ADD_USER,
    ["admin"]);

  if (isLoading) {
    return <LoadingScreen messageQueue={"Loading..."} />;
  }

  if (!hasPermission) {
    return <NoAccessScreen />;
  }

  return (
    <div className="w-screen py-3">
      <EmployeeManage userRole={UserRolesEnum.admin} />
    </div>
  );
};

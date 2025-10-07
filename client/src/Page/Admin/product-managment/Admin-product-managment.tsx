import React, { useState } from "react";
import {
  LoadingScreen,
  ManageProduct,
  NoAccessScreen,
} from "../../../components";
import { usePagePermission } from "../../../Hook";
import { AppFeature } from "../../../Constant";

export const AdminProductManagment = () => {
  const { isLoading, hasPermission } = usePagePermission(
    AppFeature.ADD_PRODUCT,
    ["admin"]
  );

  if (isLoading) {
    return <LoadingScreen messageQueue={"Loading..."} />;
  }

  if (!hasPermission) {
    return <NoAccessScreen />;
  }

  return (
    <>
      <div className="w-screen py-3">
        <ManageProduct />
      </div>
    </>
  );
};
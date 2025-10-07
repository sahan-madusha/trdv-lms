import React, { useState } from "react";
import {
  LoadingScreen,
  ManageProduct,
  NoAccessScreen,
} from "../../../components";
import { usePagePermission } from "../../../Hook";
import { AppFeature } from "../../../Constant";

export const AgencyProductManagment = () => {
  const { isLoading, hasPermission } = usePagePermission(
    AppFeature.ADD_PRODUCT,
    ["agency", "agency_manager"]
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

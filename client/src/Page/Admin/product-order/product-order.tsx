import {
  LoadingScreen,
  ManageProductOrder,
  NoAccessScreen,
} from "../../../components";
import { AppFeature } from "../../../Constant";
import { usePagePermission } from "../../../Hook";

export const AdminProducrOrderManage = () => {
  const { isLoading, hasPermission } = usePagePermission(
    AppFeature.CREATE_SALES_ORDER,
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
        <ManageProductOrder />
      </div>
    </>
  );
};

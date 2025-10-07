import {
  LoadingScreen,
  NoAccessScreen,
  PurchasePoduct,
} from "../../../components";
import { AppFeature } from "../../../Constant";
import { usePagePermission } from "../../../Hook";

export const AdminProducrPurchase = () => {
  const { isLoading, hasPermission } = usePagePermission(
    AppFeature.EDIT_PRODUCT,
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
        <PurchasePoduct />
      </div>
    </>
  );
};

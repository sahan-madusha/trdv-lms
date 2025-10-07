import { usePagePermission } from "../../../Hook";
import { AppFeature, UserRolesEnum } from "../../../Constant";
import {
  EmployeeManage,
  LoadingScreen,
  NoAccessScreen,
} from "../../../components";

export const AgencyUserManagmentPage = () => {
  const { isLoading, hasPermission } = usePagePermission(
    AppFeature.ADD_USER,
    ["agency"]
  );

  if (isLoading) {
    return <LoadingScreen messageQueue={"Loading..."} />;
  }

  if (!hasPermission) {
    return <NoAccessScreen />;
  }

  return (
    <div className="w-screen py-3">
        <EmployeeManage
          userRole={UserRolesEnum.agency}
        />
    </div>
  );
};

import { LoadingScreen, NoAccessScreen } from "../../../components";
import { AppFeature } from "../../../Constant";
import { usePagePermission } from "../../../Hook";

export const AdminDashboardPage = () => {
  const { isLoading, hasPermission } = usePagePermission(
    AppFeature.VIEW_DASHBOARD,
    ["admin","head_office_manager"]
  );

  if (isLoading) {
    return <LoadingScreen messageQueue={"Loading..."} />;
  }

  if (!hasPermission) {
    return <NoAccessScreen />;
  }

  return (
    <>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed repellat
      alias sapiente rerum at labore omnis, aut tenetur mollitia aliquid ea
      molestias quos ullam dolorum fugit saepe delectus exercitationem
      necessitatibus!
    </>
  );
};

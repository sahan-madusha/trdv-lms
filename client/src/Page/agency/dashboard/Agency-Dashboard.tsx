import { LoadingScreen, NoAccessScreen } from "../../../components";
import { AppFeature } from "../../../Constant";
import { usePagePermission } from "../../../Hook";

export const AgencyDashboardPage = () => {
  const { isLoading, hasPermission } = usePagePermission(
    AppFeature.VIEW_DASHBOARD,
    ["agency","agency_manager"]
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

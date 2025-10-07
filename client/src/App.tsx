import "./globals.css";
import "antd/dist/reset.css";
import "react-quill/dist/quill.snow.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import {
  PRODUCT_MANAGE,
  DASHBOARD,
  LOGIN,
  LOGIN_SUCCESS,
  USER_MANAGE,
  PRODUCT_PURCHASE,
  OORDER_MANAGE,
} from "./Constant";
import {
  AdminDashboardPage,
  AdminProductManagment,
  AdminUserManagmentPage,
  AgencyUserManagmentPage,
  LogingSuccessPage,
  AdminProducrPurchase,
  SignInPage,
  AdminProducrOrderManage,
  AgencyProducrOrderManage,
  AgencyDashboardPage,
  AgencyProductManagment,
} from "./Page";
import { AppSidebar } from "./components/side-bar/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path={"/*"}
            element={
              <>
                <Routes>
                  <Route path={LOGIN} element={<SignInPage />} />
                  <Route path={LOGIN_SUCCESS} element={<LogingSuccessPage />} />
                </Routes>
              </>
            }
          />
          <Route
            path={"/admin/*"}
            element={
              <>
                <SidebarProvider>
                  <AppSidebar />
                  <Routes>
                    <Route path={DASHBOARD} element={<AdminDashboardPage />} />
                    <Route
                      path={USER_MANAGE}
                      element={<AdminUserManagmentPage />}
                    />
                    <Route
                      path={PRODUCT_MANAGE}
                      element={<AdminProductManagment />}
                    />
                    <Route
                      path={PRODUCT_PURCHASE}
                      element={<AdminProducrPurchase />}
                    />
                    <Route
                      path={OORDER_MANAGE}
                      element={<AdminProducrOrderManage />}
                    />
                  </Routes>
                </SidebarProvider>
              </>
            }
          />

          <Route
            path={"/agency/*"}
            element={
              <>
                <SidebarProvider>
                  <AppSidebar />
                  <Routes>
                    <Route path={DASHBOARD} element={<AgencyDashboardPage />} />
                    <Route
                      path={USER_MANAGE}
                      element={<AgencyUserManagmentPage />}
                    />
                    <Route
                      path={PRODUCT_MANAGE}
                      element={<AgencyProductManagment />}
                    />
                    <Route
                      path={OORDER_MANAGE}
                      element={<AgencyProducrOrderManage />}
                    />
                  </Routes>
                </SidebarProvider>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

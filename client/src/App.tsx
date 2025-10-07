import "./globals.css";
import "antd/dist/reset.css";
import "react-quill/dist/quill.snow.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  LOGIN,
  LOGIN_SUCCESS,
} from "./Constant";
import { LogingSuccessPage, SignInPage } from "./Page";
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
                    <></>
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
                   <></>
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

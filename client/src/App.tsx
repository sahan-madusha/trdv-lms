import "./globals.css";
import "antd/dist/reset.css";
import "react-quill/dist/quill.snow.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import {
  LOGIN,
  LOGIN_SUCCESS,
} from "./Constant";
import {
  LogingSuccessPage,
  SignInPage,
} from "./Page";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;

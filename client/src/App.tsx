import "./globals.css";
import "antd/dist/reset.css";
import "react-quill/dist/quill.snow.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import {
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
                  <Route path={"/"} element={<SignInPage />} />
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

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        {/* <AuthProvider> */}
          <App />
        {/* </AuthProvider> */}
      </QueryClientProvider>
    </React.StrictMode>
  </>,
  document.getElementById("root")
);

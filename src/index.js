import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // ✅ Import Provider
import App from "App";
import store from "./redux/store";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    {" "}
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </Provider>
);

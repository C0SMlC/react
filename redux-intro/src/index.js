import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

// store.dispatch({
//   type: "customer/create",
//   payload: {
//     fullName: "John Doe",
//     nationalId: "1234567890",
//     createdAt: new Date().toISOString(),
//   },
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

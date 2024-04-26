import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./fonts/VAGRounded-Regular.otf";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Setup Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/rootReducer";

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <GoogleOAuthProvider clientId="508621019009-461kn6gbp9jtv7gkm4mphsv3dcqdio3s.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();

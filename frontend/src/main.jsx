// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import "./App.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

import React from "react";
import ReactDOM from "react-dom/client"; // Updated import
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

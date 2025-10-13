import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ListaContactosProvider from "./components/Context/ListaContactosContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ListaContactosProvider>
    <App />
  </ListaContactosProvider>
);

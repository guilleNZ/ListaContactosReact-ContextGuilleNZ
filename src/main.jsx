import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ListaContactosProvider from "./components/Context/ListaContactosContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ListaContactosProvider>
    <App />
  </ListaContactosProvider>
);

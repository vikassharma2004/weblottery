import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "./providers/QueryProvider.jsx";
import { ToastContainer, toast } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryProvider>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        theme="colored"
      />
    </QueryProvider>
  </BrowserRouter>
);

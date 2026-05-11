import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position='top-center'
        toastOptions={{
          style: {
            background: "#1F140F",
            color: "#FFF6EC",
            border: "1px solid #D98B2B",
          },
          className: "font-medium rounded-2xl",
          duration: 3000,
        }}
      />
    </BrowserRouter>
  </StrictMode>,
);

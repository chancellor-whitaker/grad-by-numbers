import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import "./index.css";
import App from "./Testing.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

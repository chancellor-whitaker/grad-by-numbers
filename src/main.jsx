import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { Wrapper } from "./Wrapper";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Wrapper heading="Spring 2025 Grads by the Numbers">
      <App></App>
    </Wrapper>
  </StrictMode>
);

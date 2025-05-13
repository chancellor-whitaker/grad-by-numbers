import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { Wrapper } from "./Wrapper";
import App from "./App";

// location: https://www.irserver2.eku.edu/Reports/spring-2025-infographic/
// update 2024 to 2025 in data page reports file

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Wrapper heading="Spring 2025 Grads Infographic">
      <App></App>
    </Wrapper>
  </StrictMode>
);

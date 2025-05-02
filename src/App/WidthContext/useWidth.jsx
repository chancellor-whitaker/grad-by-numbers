import { useContext } from "react";

import { WidthContext } from ".";

export function useWidth() {
  return useContext(WidthContext);
}

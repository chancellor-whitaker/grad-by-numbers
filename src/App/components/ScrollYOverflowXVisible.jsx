import React from "react";

export const ScrollYOverflowXVisible = ({ height = "300px", children }) => {
  return (
    <div style={{ position: "relative", overflow: "visible" }}>
      <div style={{ position: "relative" }}>
        <div
          style={{
            paddingRight: "8px", // optional for scrollbar spacing
            maxHeight: height,
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

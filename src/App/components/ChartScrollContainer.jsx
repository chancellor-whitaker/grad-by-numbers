// import { useState } from "react";

export const ChartScrollContainer = ({ children }) => {
  // const [scrollEvent, setScrollEvent] = useState();

  // console.log(scrollEvent);

  return (
    <div className="position-relative">
      <div
        className="overflow-y-scroll"
        // onScroll={setScrollEvent}
        style={{ height: 300 }}
      >
        {children}
      </div>
      {/* <div className="position-absolute top-0 start-0 h-100 w-100">
        {children}
      </div> */}
    </div>
  );
};

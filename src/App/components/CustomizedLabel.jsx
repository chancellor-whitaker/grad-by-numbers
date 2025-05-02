import { useEffect, useState, useRef } from "react";

const RADIAN = Math.PI / 180;

export const CustomizedLabel = ({
  filteredValue: displayValue = 0,
  innerRadius,
  outerRadius,
  formatter,
  midAngle,
  opacity,
  // percent,
  // value,
  name,
  cx,
  cy,
  // ...rest
}) => {
  // const { opacity } = rest;

  const textRef = useRef(null);

  const [bbox, setBbox] = useState({ height: 0, width: 0, x: 0, y: 0 });

  useEffect(() => {
    if (textRef.current) {
      const { height, width, x, y } = textRef.current.getBBox();
      setBbox({ height, width, x, y });
    }
  }, []);

  const formatted = [...formatter(displayValue, name)].reverse().join(" : ");

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    opacity === 1 &&
    displayValue > 0 && (
      <>
        <rect
          height={bbox.height + 4}
          width={bbox.width + 8}
          fill="lightblue"
          x={bbox.x - 4}
          y={bbox.y - 2}
          rx="4"
        />
        <text
          textAnchor={x > cx ? "start" : "end"}
          style={{ backgroundColor: "green" }}
          dominantBaseline="central"
          fill="#343a40"
          ref={textRef}
          x={x}
          y={y}
        >
          {/* {`${(percent * 100).toFixed(0)}%`} */}
          {formatted}
        </text>
      </>
    )
  );
};

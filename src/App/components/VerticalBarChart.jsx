import {
  ResponsiveContainer,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

import { defaultValueFormatter } from "../utils/defaultValueFormatter";
import { defaultNameFormatter } from "../utils/defaultNameFormatter";

const defaultData = [
  {
    name: "Page A",
    value: 2400,
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    value: 2210,
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    value: 2290,
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    value: 2000,
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    value: 2181,
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    value: 2500,
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    value: 2100,
    uv: 3490,
    pv: 4300,
  },
];

export const VerticalBarChart = ({
  valueFormatter = defaultValueFormatter,
  nameFormatter = defaultNameFormatter,
  categoricalDataKey = "name",
  numericalDataKey = "value",
  textColor = "white",
  barColor = "green",
  data = defaultData,
  className = "",
  width = "100%",
  // height = 250,
}) => {
  const fieldFinder = Object.fromEntries(
    data.map(({ field, name }) => [name, field])
  );

  const tickFormatter = (name) =>
    nameFormatter({ field: fieldFinder[name], name });

  return (
    <ResponsiveContainer
      className={["small", className].filter((string) => string).join(" ")}
      height={data.length * 45}
      width={width}
    >
      <BarChart layout="vertical" data={data}>
        <XAxis dataKey={numericalDataKey} type="number" hide />
        <YAxis
          tickFormatter={tickFormatter}
          dataKey={categoricalDataKey}
          stroke={textColor}
          axisLine={false}
          tickLine={false}
          type="category"
        />
        <Tooltip
          formatter={(value) => [valueFormatter(value), ""]}
          labelStyle={{ color: "#343a40" }}
          itemStyle={{ color: "#343a40" }}
          labelFormatter={tickFormatter}
          separator=""
        ></Tooltip>
        <Bar
          label={{
            formatter: valueFormatter,
            position: "right",
            fill: textColor,
          }}
          dataKey={numericalDataKey}
          fill={barColor}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

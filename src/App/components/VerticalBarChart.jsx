import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

const data = [
  {
    name: "Page A",
    amt: 2400,
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    amt: 2210,
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    amt: 2290,
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    amt: 2000,
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    amt: 2181,
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    amt: 2500,
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    amt: 2100,
    uv: 3490,
    pv: 4300,
  },
];

export const VerticalBarChart = ({
  yAxisDataKey = "name",
  xAxisDataKey = "amt",
  textColor = "white",
  barColor = "green",
  height = 250,
}) => {
  return (
    <ResponsiveContainer height={height} width="100%">
      <BarChart layout="vertical" data={data}>
        <XAxis dataKey={xAxisDataKey} type="number" hide />
        <YAxis
          dataKey={yAxisDataKey}
          stroke={textColor}
          axisLine={false}
          tickLine={false}
          type="category"
        />
        <Bar
          label={{ fill: textColor }}
          dataKey={xAxisDataKey}
          fill={barColor}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

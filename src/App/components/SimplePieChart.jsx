import { ResponsiveContainer, PieChart, Cell, Pie } from "recharts";

import { ekuColors } from "../utils/ekuColors";

const defaultData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = [
  ekuColors.goldenrodYellow,
  ekuColors.autumnOrange,
  ekuColors.kentuckyBluegrass,
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  innerRadius,
  outerRadius,
  midAngle,
  percent,
  //   index,
  cx,
  cy,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fill="white"
      x={x}
      y={y}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const SimplePieChart = ({
  data: unsortedData = defaultData,
  categoricalDataKey = "name",
  numericalDataKey = "value",
  className = "",
  width = "100%",
  //   textColor = "white",
  //   barColor = "green",
  height = 175,
}) => {
  const names = unsortedData
    .map(({ [categoricalDataKey]: name }) => name)
    .sort();

  const data = names.map((string) =>
    unsortedData.find(({ [categoricalDataKey]: name }) => name === string)
  );

  return (
    <ResponsiveContainer
      className={["small", className].filter((string) => string).join(" ")}
      height={height}
      width={width}
    >
      <PieChart>
        <Pie
          label={renderCustomizedLabel}
          dataKey={numericalDataKey}
          labelLine={false}
          outerRadius={75}
          fill="#8884d8"
          data={data}
          cx="50%"
          cy="50%"
        >
          {data.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} key={`cell-${index}`} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

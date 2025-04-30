import { ResponsiveContainer, PieChart, Tooltip, Cell, Pie } from "recharts";

import { defaultValueFormatter } from "../utils/defaultValueFormatter";
import { defaultNameFormatter } from "../utils/defaultNameFormatter";
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
  formatter,
  midAngle,
  percent,
  value,
  name, //   index,
  cx,
  cy,
}) => {
  const formatted = [...formatter(value, name)].reverse().join(" : ");

  console.log(formatted);

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fill="#343a40"
      x={x}
      y={y}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const SimplePieChart = ({
  valueFormatter = defaultValueFormatter,
  nameFormatter = defaultNameFormatter,
  data: unsortedData = defaultData,
  categoricalDataKey = "name",
  numericalDataKey = "value",
  className = "",
  width = "100%",
  height = 175,
}) => {
  const names = unsortedData
    .map(({ [categoricalDataKey]: name }) => name)
    .sort();

  const data = names.map((string) =>
    unsortedData.find(({ [categoricalDataKey]: name }) => name === string)
  );

  const fieldFinder = Object.fromEntries(
    data.map(({ field, name }) => [name, field])
  );

  const tickFormatter = (name) =>
    nameFormatter({ field: fieldFinder[name], name });

  const formatter = (value, name) => [
    valueFormatter(value),
    tickFormatter(name),
  ];

  return (
    <ResponsiveContainer
      className={["small", className].filter((string) => string).join(" ")}
      height={height}
      width={width}
    >
      <PieChart>
        <Tooltip formatter={formatter}></Tooltip>
        <Pie
          label={(props) => renderCustomizedLabel({ ...props, formatter })}
          dataKey={numericalDataKey}
          labelLine={false}
          outerRadius={75}
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

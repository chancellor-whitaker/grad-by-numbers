import { ResponsiveContainer, LabelList, PieChart, Cell, Pie } from "recharts";

import { chartHeight } from "../utils/chartHeight";
import { colors } from "../utils/colors";

export const SimplePieChart = ({
  // showOriginalLabels,
  filteredData = [],
  data = [],
  onClick,
}) => {
  const object = Object.fromEntries(
    data.map((element) => [element.name, { ...element }])
  );

  filteredData.forEach(
    ({ value, name }) => (object[name].filteredValue = value)
  );

  const chartData = Object.values(object);

  return (
    <ResponsiveContainer height={chartHeight} width="100%">
      <PieChart>
        {/* <Pie
          fill={colors.bar.background}
          onClick={onClick}
          outerRadius={100}
          data={chartData}
          dataKey="value"
          cx="50%"
          cy="50%"
        >
          {chartData.map(({ name }, index) => (
            <Cell fill={colors[name]?.background} key={`cell-${index}`} />
          ))}
          {showOriginalLabels && (
            <LabelList
              valueAccessor={({ value, name }) => `${name}, ${value}`}
            ></LabelList>
          )}
        </Pie> */}
        <Pie
          label={renderCustomizedLabel}
          fill={colors.bar.background}
          onClick={onClick}
          outerRadius={100}
          labelLine={false}
          data={chartData}
          dataKey="value"
          cx="50%"
          cy="50%"
        >
          {chartData.map(({ name }, index) => (
            <Cell fill={colors[name]?.background} key={`cell-${index}`} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  innerRadius,
  outerRadius,
  midAngle,
  percent,
  value,
  cx,
  cy,
}) => {
  const isPercent = value === percent;

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
      {isPercent ? `${(percent * 100).toFixed(0)}%` : value.toLocaleString()}
    </text>
  );
};

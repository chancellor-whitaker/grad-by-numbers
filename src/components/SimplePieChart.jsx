import { ResponsiveContainer, LabelList, PieChart, Cell, Pie } from "recharts";

import { chartHeight } from "../utils/chartHeight";
import { colors } from "../utils/colors";

export const SimplePieChart = ({
  showOriginalLabels,
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

  console.log(chartData);

  const label = showOriginalLabels ? renderCustomizedLabel : null;

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
          // fill={colors.bar.foreground}
          onClick={onClick}
          outerRadius={100}
          labelLine={false}
          data={chartData}
          dataKey="value"
          label={label}
          cx="50%"
          cy="50%"
        >
          {chartData.map(({ name }, index) => (
            <Cell
              fill={colors[name]?.background}
              key={`cell-${index}`}
              opacity={1}
            />
          ))}
        </Pie>
        {chartData.map(({ filteredValue = 0, name: category, value }) => (
          <Pie
            outerRadius={(filteredValue / value) * 100}
            label={renderCustomizedLabel}
            // fill={colors.bar.foreground}
            onClick={onClick}
            labelLine={false}
            data={chartData}
            dataKey="value"
            key={category}
            cx="50%"
            cy="50%"
          >
            {chartData.map(({ name }, index) => (
              <Cell
                // strokeOpacity={name === category ? 1 : 0}
                opacity={name === category ? 1 : 0}
                fill={colors[name]?.foreground}
                key={`cell-${index}`}
              />
            ))}
          </Pie>
        ))}
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
  opacity,
  value,
  cx,
  cy,
  ...rest
}) => {
  const yourValue = rest.payload.filteredValue
    ? rest.payload.filteredValue
    : value;

  const isPercent = yourValue === percent;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return outerRadius === 0 || opacity === 0 ? null : (
    <text
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fill="white"
      x={x}
      y={y}
    >
      {isPercent
        ? `${(percent * 100).toFixed(0)}%`
        : yourValue?.toLocaleString()}
    </text>
  );
};

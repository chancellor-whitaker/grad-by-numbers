import { ResponsiveContainer, LabelList, PieChart, Cell, Pie } from "recharts";

import { chartHeight } from "../utils/chartHeight";
import { colors } from "../utils/colors";

export const SimplePieChart = ({
  showOriginalLabels,
  filteredData = [],
  outerRadius = 100,
  data = [],
  onClick,
}) => {
  return (
    <ResponsiveContainer height={chartHeight} width="100%">
      <PieChart>
        <Pie
          fill={colors.bar.background}
          onClick={onClick}
          outerRadius={100}
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
        >
          {data.map(({ name }, index) => (
            <Cell fill={colors[name]?.background} key={`cell-${index}`} />
          ))}
          {showOriginalLabels && (
            <LabelList
              valueAccessor={({ value, name }) => `${name}, ${value}`}
            ></LabelList>
          )}
        </Pie>
        <Pie
          fill={colors.bar.foreground}
          outerRadius={outerRadius}
          data={filteredData}
          onClick={onClick}
          dataKey="value"
          cx="50%"
          cy="50%"
        >
          {filteredData.map(({ name }, index) => (
            <Cell fill={colors[name]?.foreground} key={`cell-${index}`} />
          ))}
          <LabelList
            valueAccessor={({ value, name }) => `${name}, ${value}`}
          ></LabelList>
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

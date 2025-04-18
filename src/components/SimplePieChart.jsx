import { ResponsiveContainer, LabelList, PieChart, Pie } from "recharts";

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
          fill={colors.backgroundBar}
          onClick={onClick}
          outerRadius={100}
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
        >
          {showOriginalLabels && (
            <LabelList
              valueAccessor={({ value, name }) => `${name}, ${value}`}
            ></LabelList>
          )}
        </Pie>
        <Pie
          fill={colors.foregroundBar}
          outerRadius={outerRadius}
          data={filteredData}
          onClick={onClick}
          dataKey="value"
          cx="50%"
          cy="50%"
        >
          <LabelList
            valueAccessor={({ value, name }) => `${name}, ${value}`}
          ></LabelList>
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

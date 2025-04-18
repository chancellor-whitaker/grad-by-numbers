import { ResponsiveContainer, LabelList, PieChart, Pie } from "recharts";

export const SimplePieChart = ({
  showOriginalLabels,
  filteredData = [],
  outerRadius = 100,
  height = 300,
  data = [],
  onClick,
}) => {
  return (
    <ResponsiveContainer height={height} width="100%">
      <PieChart>
        <Pie
          onClick={onClick}
          outerRadius={100}
          dataKey="value"
          fill="#8884d8"
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
          outerRadius={outerRadius}
          data={filteredData}
          onClick={onClick}
          dataKey="value"
          fill="#82ca9d"
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

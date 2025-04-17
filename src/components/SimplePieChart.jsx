import { ResponsiveContainer, LabelList, PieChart, Pie } from "recharts";

export const SimplePieChart = ({ height = 300, data = [], outer }) => {
  return (
    <ResponsiveContainer height={height} width="100%">
      <PieChart>
        {!outer && (
          <Pie
            outerRadius={75}
            dataKey="value"
            fill="#8884d8"
            data={data}
            cx="50%"
            cy="50%"
          >
            <LabelList
              valueAccessor={({ value, name }) => `${name}, ${value}`}
            ></LabelList>
          </Pie>
        )}
        {outer && (
          <Pie
            outerRadius={100}
            innerRadius={75}
            dataKey="value"
            fill="#82ca9d"
            data={data}
            cx="50%"
            cy="50%"
          >
            <LabelList
              valueAccessor={({ value, name }) => `${name}, ${value}`}
            ></LabelList>
          </Pie>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

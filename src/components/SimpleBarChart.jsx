import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

export const SimpleBarChart = ({
  showOriginalLabels,
  filteredData = [],
  data = [],
  onClick,
}) => {
  const height = data.length * 50;

  const object = Object.fromEntries(
    data.map((element) => [element.name, { ...element }])
  );

  filteredData.forEach(
    ({ value, name }) => (object[name].filteredValue = value)
  );

  const chartData = Object.values(object);

  return (
    <ResponsiveContainer height={height} width="100%">
      <BarChart
        barCategoryGap={0}
        layout="vertical"
        barGap={"-100%"}
        data={chartData}
      >
        <XAxis dataKey="value" type="number" hide />
        <YAxis type="category" dataKey="name" />
        <Bar
          label={showOriginalLabels && { position: "right" }}
          onClick={onClick}
          dataKey="value"
          fill="#8884d8"
        />
        <Bar
          label={{ position: "right", fill: "#82ca9d" }}
          dataKey="filteredValue"
          onClick={onClick}
          fill="#82ca9d"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

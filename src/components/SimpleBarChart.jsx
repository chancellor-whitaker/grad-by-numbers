import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

export const SimpleBarChart = ({ data = [] }) => {
  const height = data.length * 50;

  return (
    <ResponsiveContainer height={height} width="100%">
      <BarChart layout="vertical" data={data}>
        <XAxis dataKey="value" type="number" hide />
        <YAxis type="category" dataKey="name" />
        <Bar label={{ position: "right" }} dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

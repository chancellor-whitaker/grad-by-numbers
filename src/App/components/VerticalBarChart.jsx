import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

import { makeSpacesNonBreaking } from "../utils/makeSpacesNonBreaking";
import { defaultValueFormatter } from "../utils/defaultValueFormatter";
import { defaultNameFormatter } from "../utils/defaultNameFormatter";

const defaultData = [
  {
    name: "Page A",
    value: 2400,
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    value: 2210,
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    value: 2290,
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    value: 2000,
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    value: 2181,
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    value: 2500,
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    value: 2100,
    uv: 3490,
    pv: 4300,
  },
];

export const VerticalBarChart = ({
  margin = {
    right: 40,
    bottom: 5,
    left: 30,
    top: 5,
  },

  valueFormatter = defaultValueFormatter,
  tickFormatter = makeSpacesNonBreaking,
  nameFormatter = defaultNameFormatter,
  categoricalDataKey = "name",
  numericalDataKey = "value",
  textColor = "white",
  barColor = "green",
  data = defaultData,
  filteredData = [],
  yAxisStyle = {},
  className = "",
  width = "100%",
  onClick,
  // height = 250,
}) => {
  const object = Object.fromEntries(
    data.map((element) => [element[categoricalDataKey], { ...element }])
  );

  const filteredNumericalDataKey = `filtered${
    numericalDataKey[0].toUpperCase() +
    numericalDataKey.substring(1).toLowerCase()
  }`;

  filteredData.forEach(
    ({ [categoricalDataKey]: name, [numericalDataKey]: value }) =>
      (object[name][filteredNumericalDataKey] = value)
  );

  const chartData = Object.values(object);

  const fieldFinder = Object.fromEntries(
    chartData.map(({ [categoricalDataKey]: name, field }) => [name, field])
  );

  const formatTicks = (name) =>
    tickFormatter(nameFormatter({ field: fieldFinder[name], name }));

  const generateBarProperties = (isFiltered) => {
    return {
      label: {
        fillOpacity: isFiltered ? 1 : 0,
        formatter: valueFormatter,
        position: "right",
        fill: textColor,
      },
      dataKey: isFiltered ? filteredNumericalDataKey : numericalDataKey,
      fillOpacity: isFiltered ? 1 : 0.5,
      fill: barColor,
      onClick,
    };
  };

  return (
    <ResponsiveContainer
      className={["small", className].filter((string) => string).join(" ")}
      height={chartData.length * 45}
      width={width}
    >
      <BarChart
        barCategoryGap={0}
        layout="vertical"
        barGap={"-100%"}
        data={chartData}
        margin={margin}
      >
        <XAxis type="number" hide />
        <YAxis
          dataKey={categoricalDataKey}
          tickFormatter={formatTicks}
          style={{ ...yAxisStyle }}
          stroke={textColor}
          axisLine={false}
          tickLine={false}
          type="category"
        />
        <Bar {...generateBarProperties()} />
        <Bar {...generateBarProperties(true)} />
      </BarChart>
    </ResponsiveContainer>
  );
};

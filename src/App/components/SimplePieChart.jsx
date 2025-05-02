import { ResponsiveContainer, PieChart, Cell, Pie } from "recharts";

import { defaultValueFormatter } from "../utils/defaultValueFormatter";
import { defaultNameFormatter } from "../utils/defaultNameFormatter";
import { CustomizedLabel } from "./CustomizedLabel";
import { combineData } from "../utils/combineData";
import { ekuColors } from "../utils/ekuColors";

export const SimplePieChart = ({
  valueFormatter = defaultValueFormatter,
  nameFormatter = defaultNameFormatter,
  data: unsortedData = defaultData,
  categoricalDataKey = "name",
  numericalDataKey = "value",
  filteredData = [],
  className = "",
  width = "100%",
  height = 210,
  onClick,
}) => {
  const names = unsortedData
    .map(({ [categoricalDataKey]: name }) => name)
    .sort();

  const data = names.map((string) =>
    unsortedData.find(({ [categoricalDataKey]: name }) => name === string)
  );

  const { filteredNumericalDataKey, chartData } = combineData({
    categoricalDataKey,
    numericalDataKey,
    filteredData,
    data,
  });

  const fieldFinder = Object.fromEntries(
    chartData.map(({ [categoricalDataKey]: name, field }) => [name, field])
  );

  const tickFormatter = (name) =>
    nameFormatter({ field: fieldFinder[name], name });

  const formatter = (value, name) => [
    valueFormatter(value),
    tickFormatter(name),
  ];

  const genericPieProperties = {
    dataKey: numericalDataKey,
    labelLine: false,
    data: chartData,
    cx: "50%",
    cy: "50%",
    onClick,
  };

  console.log(chartData);

  return (
    <ResponsiveContainer
      className={["small", className].filter((string) => string).join(" ")}
      height={height}
      width={width}
    >
      <PieChart>
        <Pie {...genericPieProperties} outerRadius={100}>
          {chartData.map((entry, index) => (
            <Cell
              fill={COLORS[index % COLORS.length]}
              key={`cell-${index}`}
              opacity={0.5}
            />
          ))}
        </Pie>
        {chartData.map(
          ({
            [filteredNumericalDataKey]: filteredValue = 0,
            [categoricalDataKey]: category,
            [numericalDataKey]: value,
          }) => (
            <Pie
              {...genericPieProperties}
              label={
                <CustomizedLabel formatter={formatter} key={Math.random()} />
              }
              outerRadius={(filteredValue / value) * 100}
              key={category}
            >
              {chartData.map(({ [categoricalDataKey]: name }, index) => (
                <Cell
                  fill={COLORS[index % COLORS.length]}
                  opacity={name === category ? 1 : 0}
                  key={`cell-${index}`}
                />
              ))}
            </Pie>
          )
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

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

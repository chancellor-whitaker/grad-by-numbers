import {
  ResponsiveContainer,
  LabelList,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

import { colors } from "../utils/colors";

export const SimpleBarChart = ({
  colorScheme = colors.positiveScheme,
  textColor = "white",
  showOriginalLabels,
  filteredData = [],
  yAxisWidth = 100,
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

  const medianValue = findMedian(chartData.map(({ value }) => value));

  const medianFilteredValue = findMedian(
    chartData.map(({ filteredValue }) => filteredValue)
  );

  const label = showOriginalLabels ? renderCustomizedLabel : null;

  return (
    <ResponsiveContainer height={height} width="100%">
      <BarChart
        barCategoryGap={0}
        layout="vertical"
        barGap={"-100%"}
        data={chartData}
      >
        <XAxis dataKey="value" type="number" hide />
        <YAxis
          tick={{ fill: textColor }}
          width={yAxisWidth}
          tickLine={false}
          axisLine={false}
          type="category"
          dataKey="name"
        />
        <Bar fill={colorScheme.background} onClick={onClick} dataKey="value">
          {showOriginalLabels && (
            <LabelList
              // content={renderCustomizedLabel}
              position="right"
              fill={textColor}
            ></LabelList>
          )}
        </Bar>
        <Bar
          fill={colorScheme.foreground}
          dataKey="filteredValue"
          onClick={onClick}
        >
          <LabelList
            // content={renderCustomizedLabel}
            position="right"
            fill={textColor}
          ></LabelList>
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

const renderCustomizedLabel = (props) => {
  console.log(props);

  const {
    // position = "",
    height,
    offset,
    width,
    value,
    name,
    fill,
    x,
    y,
  } = props;

  return (
    <text
      className="recharts-text recharts-label"
      textAnchor="start"
      height={height}
      offset={offset}
      width={width}
      fill={fill}
      name={name}
      x={x}
      y={y}
    >
      <tspan dy="0.355em" x={x}>
        {value}
      </tspan>
    </text>
  );
};

function findMedian(arr) {
  const sortedArr = [...arr].sort((a, b) => a - b);
  const len = sortedArr.length;
  const mid = Math.floor(len / 2);

  if (len % 2 === 0) {
    return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
  } else {
    return sortedArr[mid];
  }
}

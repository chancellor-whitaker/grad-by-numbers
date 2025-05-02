export const combineData = ({
  categoricalDataKey,
  numericalDataKey,
  filteredData,
  data,
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

  return { filteredNumericalDataKey, chartData };
};

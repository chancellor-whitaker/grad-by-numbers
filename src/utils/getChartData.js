export const getChartData = (summary, field, ratio) => {
  const valueKey = ratio ? "ratio" : "count";

  const object = summary[field]?.values ? summary[field]?.values : {};

  return Object.entries(object)
    .map(([name, { [valueKey]: value }]) => ({
      value,
      name,
    }))
    .filter(({ name }) => name)
    .sort(({ value: a }, { value: b }) => b - a);
};

import { useState } from "react";

import { isStringNumeric } from "../utils/isStringNumeric";
import { roundToTwo } from "../utils/roundToTwo";
import { sumArray } from "../utils/sumArray";
import { promise } from "../utils/promise";
import { usePromise } from "./usePromise";

export const useVisualizationData = () => {
  const [filterBy, setFilterBy] = useState([]);

  const noFilterActive = filterBy.length !== 2;

  const data = usePromise(promise);

  console.log(data);

  const filteredData = noFilterActive
    ? data
    : data.filter(({ [filterBy[0]]: value }) => value === filterBy[1]);

  const vizData = getVizData(summarizeData(data));

  const filteredVizData = getVizData(summarizeData(filteredData));

  //   const showOriginalLabels = (key) => !noFilterActive && key === filterBy[0];

  const handleClick = (...props) => {
    // console.log(props);

    const newPair = [props[0].field, props[0].name];

    setFilterBy((currentPair) => {
      if (currentPair.length !== 2) return newPair;

      if (currentPair[0] === newPair[0] && currentPair[1] === newPair[1]) {
        return [];
      }

      return newPair;
    });
  };

  return { filteredData: filteredVizData, onClick: handleClick, data: vizData };
};

const summarizeData = (data) => {
  const rows = [data].filter((element) => element).flat();

  const object = {};

  rows.forEach((row) => {
    Object.keys(row).forEach((field) => {
      if (!(field in object)) {
        object[field] = { isNumeric: true, distinct: 0, values: {}, sum: 0 };
      }

      object[field].sum++;

      const value = row[field];

      if (!(value in object[field].values)) {
        if (!isStringNumeric(`${value}`)) object[field].isNumeric = false;

        object[field].values[value] = 0;

        object[field].distinct++;
      }

      object[field].values[value]++;
    });
  });

  return Object.fromEntries(
    Object.entries(object).map(
      ([field, { isNumeric, distinct, values, sum }]) => [
        field,
        {
          average: !isNumeric
            ? null
            : sumArray(
                Object.entries(values).map(
                  ([value, count]) => Number(value) * count
                )
              ) / sum,
          values: Object.fromEntries(
            Object.entries(values).map(([value, count]) => [
              value,
              { ratio: count / sum, count },
            ])
          ),
          min: !isNumeric
            ? null
            : Math.min(
                ...Object.entries(values).map(([value]) => Number(value))
              ),
          max: !isNumeric
            ? null
            : Math.max(
                ...Object.entries(values).map(([value]) => Number(value))
              ),
          isNumeric,
          distinct,
          sum,
        },
      ]
    )
  );
};

const getVizData = (summary) => ({
  age: {
    average: Math.floor(summary["Age"]?.average),
    max: Math.floor(summary["Age"]?.max),
    min: Math.floor(summary["Age"]?.min),
    title: "Average Age",
    field: "Age",
  },
  awards: {
    title: `${summary["acat_desc"]?.sum} Awards`,
    data: getChartData(summary, "acat_desc"),
    amount: summary["acat_desc"]?.sum,
    field: "acat_desc",
  },
  pell: {
    amount: getChartData(summary, "EKU_Low_Inc").find(
      ({ name }) => name === "Y"
    )?.value,
    title: "Pell Recipients",
    field: "EKU_Low_Inc",
  },
  counties: {
    amount: getChartData(summary, "COUNTYNM").length,
    data: getChartData(summary, "COUNTYNM"),
    title: "KY Counties",
    field: "COUNTYNM",
  },
  states: {
    amount: getChartData(summary, "STATENAME").length,
    data: getChartData(summary, "STATENAME"),
    field: "STATENAME",
    title: "States",
  },
  gpa: {
    average: roundToTwo(summary["Overall_GPA_End_of_Term"]?.average),
    field: "Overall_GPA_End_of_Term",
    title: "Average Graduation GPA",
  },
  serviceReg: {
    data: getChartData(summary, "EKU_Service_Region"),
    field: "EKU_Service_Region",
    title: "Service Region",
  },
  firstGen: {
    data: getChartData(summary, "FirstGenInd"),
    title: "First Generation",
    field: "FirstGenInd",
  },
  majors: {
    data: getChartData(summary, "major_desc"),
    field: "major_desc",
    title: "Majors",
  },
  level: {
    data: getChartData(summary, "SHRDGMR_LEVL_CODE"),
    field: "SHRDGMR_LEVL_CODE",
  },
  countries: {
    amount: getChartData(summary, "country").length,
    field: "country",
  },
});

const getChartData = (summary, field, ratio) => {
  const valueKey = ratio ? "ratio" : "count";

  const object = summary[field]?.values ? summary[field]?.values : {};

  return Object.entries(object)
    .map(([name, { [valueKey]: value }]) => ({
      value,
      field,
      name,
    }))
    .filter(({ name }) => name)
    .sort(({ value: a }, { value: b }) => b - a);
};

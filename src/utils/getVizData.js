import { getChartData } from "./getChartData";
import { roundToTwo } from "./roundToTwo";

export const getVizData = (summary) => ({
  level: {
    data: getChartData(summary, "SHRDGMR_LEVL_CODE", true).map(
      ({ value, ...rest }) => ({ value: roundToTwo(value, 4), ...rest })
    ),
    chart: "pie",
  },
  age: {
    average: Math.floor(summary["Age"]?.average),
    max: Math.floor(summary["Age"]?.max),
    min: Math.floor(summary["Age"]?.min),
    title: "Average Age",
  },
  award: {
    title: `${summary["acat_desc"]?.sum} Awards`,
    data: getChartData(summary, "acat_desc"),
    amount: summary["acat_desc"]?.sum,
    chart: "bar",
  },
  county: {
    amount: getChartData(summary, "COUNTYNM").length,
    data: getChartData(summary, "COUNTYNM"),
    title: "KY Counties",
    chart: "bar",
  },
  pellRecipient: {
    amount: getChartData(summary, "EKU_Low_Inc").find(
      ({ name }) => name === "Y"
    )?.value,
    title: "Pell Recipients",
  },
  state: {
    amount: getChartData(summary, "STATENAME").length,
    data: getChartData(summary, "STATENAME"),
    title: "States",
    chart: "bar",
  },
  serviceRegion: {
    data: getChartData(summary, "EKU_Service_Region"),
    title: "Service Region",
    chart: "pie",
  },
  firstGeneration: {
    data: getChartData(summary, "FirstGenInd"),
    title: "First Generation",
    chart: "pie",
  },
  gpa: {
    average: roundToTwo(summary["Overall_GPA_End_of_Term"]?.average),
    title: "Average Graduation GPA",
  },
  major: {
    data: getChartData(summary, "major_desc"),
    title: "Majors",
    chart: "bar",
  },
  country: { amount: getChartData(summary, "country").length },
});

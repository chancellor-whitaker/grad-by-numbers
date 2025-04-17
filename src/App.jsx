import { summarizeData } from "./utils/summarizeData";
import { usePromise } from "./hooks/usePromise";
import { roundToTwo } from "./utils/roundToTwo";
import { promise } from "./utils/promise";

const getChartData = (summary, field, ratio) => {
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

export default function App() {
  const data = usePromise(promise);

  const summary = summarizeData(data);

  // show occurrence of each award in bar chart, get sum of occurrences
  // show percent occurrence of each level in pie chart
  // show occurrence of each first gen value in pie chart
  // show occurrence of each service region value in pie chart
  // find avg grad gpa (unique value * occurrence) / (total values)
  // show count of pell recipient field where value is yes
  // find avg age (unique value * occurrence) / (total values)
  // show occurrence of each state in bar chart, find num of distinct states
  // show occurrence of each ky county in bar chart, find num of distinct ky counties
  // show occurrence of each major in bar chart
  // find num of distinct countries

  // organize visualization into recharts datasets as described above
  // handle managing filter state & maintaining both unfiltered viz data & filtered viz data

  console.log(summary);

  const visualization = {
    age: {
      average: Math.floor(summary["Age"]?.average),
      max: Math.floor(summary["Age"]?.max),
      min: Math.floor(summary["Age"]?.min),
    },
    state: {
      amount: getChartData(summary, "STATENAME").length,
      data: getChartData(summary, "STATENAME"),
      chart: "bar",
    },
    county: {
      amount: getChartData(summary, "COUNTYNM").length,
      data: getChartData(summary, "COUNTYNM"),
      chart: "bar",
    },
    pellRecipient: {
      amount: getChartData(summary, "EKU_Low_Inc").find(
        ({ name }) => name === "Y"
      )?.value,
    },
    award: {
      data: getChartData(summary, "acat_desc"),
      amount: summary["acat_desc"]?.sum,
      chart: "bar",
    },
    serviceRegion: {
      data: getChartData(summary, "EKU_Service_Region"),
      chart: "pie",
    },
    level: {
      data: getChartData(summary, "SHRDGMR_LEVL_CODE", true),
      chart: "pie",
    },
    firstGeneration: {
      data: getChartData(summary, "FirstGenInd"),
      chart: "pie",
    },
    gpa: { average: roundToTwo(summary["Overall_GPA_End_of_Term"]?.average) },
    major: { data: getChartData(summary, "major_desc"), chart: "bar" },
    country: { amount: getChartData(summary, "country").length },
  };

  console.log(visualization);

  return (
    <main className="container">
      <div className="my-3 p-3 bg-body rounded shadow-sm"></div>
    </main>
  );
}

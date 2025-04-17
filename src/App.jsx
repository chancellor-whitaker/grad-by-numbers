import { SimpleBarChart } from "./components/SimpleBarChart";
import { SimplePieChart } from "./components/SimplePieChart";
import { summarizeData } from "./utils/summarizeData";
import { Container } from "./components/Container";
import { usePromise } from "./hooks/usePromise";
import { getVizData } from "./utils/getVizData";
import { Section } from "./components/Section";
import { promise } from "./utils/promise";

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

  const vizData = getVizData(summary);

  console.log(vizData);

  const generateBarChartSection = (key) => {
    return (
      <Section>
        {vizData[key].title}
        <div className="overflow-y-scroll" style={{ height: 300 }}>
          <SimpleBarChart data={vizData[key].data}></SimpleBarChart>
        </div>
      </Section>
    );
  };

  const generatePieChartSection = (key, outer) => {
    return (
      <Section>
        {vizData[key].title}
        <div className="overflow-y-scroll" style={{ height: 300 }}>
          <SimplePieChart
            data={vizData[key].data}
            outer={outer}
          ></SimplePieChart>
        </div>
      </Section>
    );
  };

  return (
    <Container>
      {generateBarChartSection("award")}
      {generatePieChartSection("level")}
      {generatePieChartSection("firstGeneration", true)}
      {generatePieChartSection("serviceRegion", true)}
      <Section>
        {vizData.gpa.title}
        {vizData.gpa.average}
      </Section>
      <Section>
        {vizData.pellRecipient.title}
        {vizData.pellRecipient.amount}
      </Section>
      <Section>
        {vizData.age.title}
        {vizData.age.average}
      </Section>
      {generateBarChartSection("state")}
      {generateBarChartSection("county")}
      {generateBarChartSection("major")}
      <Section>
        <>Graduates represent</>
        <>{vizData.country.amount} countries</>
        <>{vizData.state.amount} states</>
        <>{vizData.county.amount} counties</>
      </Section>
    </Container>
  );
}

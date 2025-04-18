import { useState } from "react";

import { SimpleBarChart } from "./components/SimpleBarChart";
import { SimplePieChart } from "./components/SimplePieChart";
import { summarizeData } from "./utils/summarizeData";
import { Container } from "./components/Container";
import { usePromise } from "./hooks/usePromise";
import { getVizData } from "./utils/getVizData";
import { Section } from "./components/Section";
import { promise } from "./utils/promise";

export default function App() {
  const [filterBy, setFilterBy] = useState([]);

  const noFilterActive = filterBy.length !== 2;

  const data = usePromise(promise);

  const filteredData = noFilterActive
    ? data
    : data.filter(({ [filterBy[0]]: value }) => value === filterBy[1]);

  const outerRadius =
    filteredData?.length && data?.length
      ? (filteredData.length / data.length) * 100
      : 100;

  const vizData = getVizData(summarizeData(data));

  const filteredVizData = getVizData(summarizeData(filteredData));

  const handleClick = (...props) => {
    console.log(props);

    const newPair = [props[0].field, props[0].name];

    setFilterBy((currentPair) => {
      if (currentPair.length !== 2) return newPair;

      if (currentPair[0] === newPair[0] && currentPair[1] === newPair[1]) {
        return [];
      }

      return newPair;
    });
  };

  const generateBarChartSection = (key) => {
    return (
      <Section>
        {vizData[key].title}
        <div className="overflow-y-scroll" style={{ height: 300 }}>
          <SimpleBarChart
            filteredData={filteredVizData[key].data}
            data={vizData[key].data}
            onClick={handleClick}
          ></SimpleBarChart>
        </div>
      </Section>
    );
  };

  const generatePieChartSection = (key) => {
    return (
      <Section>
        {vizData[key].title}
        <div className="overflow-y-scroll" style={{ height: 300 }}>
          <SimplePieChart
            filteredData={filteredVizData[key].data}
            outerRadius={outerRadius}
            data={vizData[key].data}
            onClick={handleClick}
          ></SimplePieChart>
        </div>
      </Section>
    );
  };

  return (
    <Container>
      {generateBarChartSection("award")}
      {generatePieChartSection("level")}
      {generatePieChartSection("firstGeneration")}
      {generatePieChartSection("serviceRegion")}
      <Section>
        {filteredVizData.gpa.title}
        {filteredVizData.gpa.average}
      </Section>
      <Section>
        {filteredVizData.pellRecipient.title}
        {filteredVizData.pellRecipient.amount}
      </Section>
      <Section>
        {filteredVizData.age.title}
        {filteredVizData.age.average}
      </Section>
      {generateBarChartSection("state")}
      {generateBarChartSection("county")}
      {generateBarChartSection("major")}
      <Section>
        <>Graduates represent</>
        <>{filteredVizData.country.amount} countries</>
        <>{filteredVizData.state.amount} states</>
        <>{filteredVizData.county.amount} counties</>
      </Section>
    </Container>
  );
}

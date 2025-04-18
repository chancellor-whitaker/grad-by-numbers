import { useState } from "react";

import { SimpleBarChart } from "./components/SimpleBarChart";
import { SimplePieChart } from "./components/SimplePieChart";
import { summarizeData } from "./utils/summarizeData";
import { FlexColumn } from "./components/FlexColumn";
import { Container } from "./components/Container";
import { chartHeight } from "./utils/chartHeight";
import { usePromise } from "./hooks/usePromise";
import { getVizData } from "./utils/getVizData";
import { Section } from "./components/Section";
import { FlexRow } from "./components/FlexRow";
import { Block } from "./components/Block";
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

  const showOriginalLabels = (key) => !noFilterActive && key === filterBy[0];

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
      <div style={{ height: chartHeight }} className="overflow-y-scroll">
        <SimpleBarChart
          showOriginalLabels={showOriginalLabels(vizData[key].field)}
          filteredData={filteredVizData[key].data}
          data={vizData[key].data}
          onClick={handleClick}
        ></SimpleBarChart>
      </div>
    );
  };

  const generatePieChartSection = (key) => {
    return (
      <div style={{ height: chartHeight }} className="overflow-y-scroll">
        <SimplePieChart
          showOriginalLabels={showOriginalLabels(vizData[key].field)}
          filteredData={filteredVizData[key].data}
          outerRadius={outerRadius}
          data={vizData[key].data}
          onClick={handleClick}
        ></SimplePieChart>
      </div>
    );
  };

  // if every child of a flex-row is a flex-column, you can ensure proper width spacing (by making all flex-columns have w-100)
  // mixed up how the sizing of the filtered pie chart is calculated (don't change proportions, just change outer radius size of each cell based on amount still active vs amount originally active)

  return (
    <Container>
      <Section>
        <FlexColumn>
          <FlexRow>
            <Block>
              <div className="fs-5">{filteredVizData.award.title}</div>
              <div>{generateBarChartSection("award")}</div>
              <div>{generatePieChartSection("level")}</div>
            </Block>
            <FlexColumn>
              <Block>
                <div className="fs-5">
                  {filteredVizData.firstGeneration.title}
                </div>
                <div>{generatePieChartSection("firstGeneration")}</div>
              </Block>
              <Block>
                <div className="fs-5">
                  {filteredVizData.serviceRegion.title}
                </div>
                <div>{generatePieChartSection("serviceRegion")}</div>
              </Block>
            </FlexColumn>
            <FlexColumn>
              <Block>
                <div className="fs-5">{filteredVizData.gpa.title}</div>
                <div className="fs-1">{filteredVizData.gpa.average}</div>
              </Block>
              <Block>
                <div className="fs-5">
                  {filteredVizData.pellRecipient.title}
                </div>
                <div className="fs-1">
                  {filteredVizData.pellRecipient.amount}
                </div>
              </Block>
              <Block>
                <div className="fs-5">{filteredVizData.age.title}</div>
                <div className="fs-1">{filteredVizData.age.average}</div>
              </Block>
            </FlexColumn>
          </FlexRow>
          <FlexRow>
            <Block>
              <div className="fs-5">{filteredVizData.state.title}</div>
              <div>{generateBarChartSection("state")}</div>
            </Block>
            <Block>
              <div className="fs-5">{filteredVizData.county.title}</div>
              <div>{generateBarChartSection("county")}</div>
            </Block>
            <Block>
              <div className="fs-5">{filteredVizData.major.title}</div>
              <div>{generateBarChartSection("major")}</div>
            </Block>
          </FlexRow>
          <FlexRow>
            <Block>
              <div className="fs-5">Graduates represent</div>
              <div className="fs-4">
                {filteredVizData.country.amount} countries
              </div>
              <div className="fs-4">{filteredVizData.state.amount} states</div>
              <div className="fs-4">
                {filteredVizData.county.amount} counties
              </div>
            </Block>
            <Block>
              <div className="fs-5">Chance</div>
            </Block>
            <Block>
              <div className="fs-5">Chance</div>
            </Block>
          </FlexRow>
        </FlexColumn>
      </Section>
      {/* {generateBarChartSection("award")}
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
      </Section> */}
    </Container>
  );
}

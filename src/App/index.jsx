import { ChartScrollContainer } from "./components/ChartScrollContainer";
import { formatTwoDecimalPlaces } from "./utils/formatTwoDecimalPlaces";
import { defaultValueFormatter } from "./utils/defaultValueFormatter";
import { useVisualizationData } from "./hooks/useVisualizationData";
import { VerticalBarChart } from "./components/VerticalBarChart";
import { ImageBackground } from "./components/ImageBackground";
import { SimplePieChart } from "./components/SimplePieChart";
import { abbreviateState } from "./utils/abbreviateState";
import { KYStatsLink } from "./components/KYStatsLink";
import { colorSchemes } from "./utils/colorSchemes";
import { fontSizes } from "./utils/fontSizes";
import { HStack } from "./components/HStack";
import { Metric } from "./components/Metric";
import { VStack } from "./components/VStack";
import { Block } from "./components/Block";
import { Title } from "./components/Title";
import donate from "./assets/donate.png";
import globe from "./assets/globe.png";
import star from "./assets/star.png";

export default function App() {
  const vizData = useVisualizationData();

  console.log(vizData);

  // const { filteredData } = vizData;

  const blocks = createBlocks(vizData);

  return (
    <main className="container">
      <div className="my-3">
        <div className="bd-example-flex">
          <VStack>
            <HStack>{blocks.awards}</HStack>
            <HStack>
              {blocks.level}
              {blocks.firstGen}
              {blocks.serviceReg}
            </HStack>
            <HStack>
              {blocks.gpa}
              {blocks.pell}
              {blocks.age}
            </HStack>
            <HStack>
              {blocks.states}
              {blocks.counties}
              {blocks.majors}
            </HStack>
            <HStack>
              {blocks.locations}
              {blocks.work}
              {blocks.salary}
            </HStack>
          </VStack>
        </div>
      </div>
    </main>
  );
}

// * shrink scholar icon width
// * remove "degree" from ticks
// * abbreviate "certificate" in ticks
// * make pie chart text readable
// * format numbers
// * could shrink undergraduate & graduate
// * remove tooltips
// * make y axis ticks stop wrapping
// * handle x overflow in scrollable charts
// * make pie chart labels rects consistent
// * make bar chart filtering operational again
// ! make pie chart filtering operational again
// ! handle responsive wrapping
// ? try changing block bg color by row
// ? consider using major codes as an alternative to allowing text wrapping to occur in majors chart

const createBlocks = (vizData) => {
  const { filteredData, onClick, data } = vizData;

  const generateChartProperties = (key) => ({
    filteredData: filteredData[key].data,
    data: data[key].data,
    onClick,
  });

  return {
    awards: (
      <Block>
        <HStack columnWidths={"auto"}>
          <>
            <ImageBackground height={200} className=""></ImageBackground>
          </>
          <div className="position-relative w-100">
            <VerticalBarChart
              {...generateChartProperties("awards")}
              {...colorSchemes.maroon}
              margin={{
                right: 40,
                bottom: 5,
                left: 60,
                top: 5,
              }}
            ></VerticalBarChart>
            <div className="position-absolute bottom-0 end-0">
              <div>
                <Metric displayFontSize={2} className="me-3" as="span">
                  {defaultValueFormatter(filteredData.awards.amount)}
                </Metric>
                <span className="display-2 fw-bold">Awards</span>
              </div>
            </div>
          </div>
        </HStack>
      </Block>
    ),
    locations: (
      <Block>
        <HStack>
          <>
            <Title>Graduates represent</Title>
            <Metric fontSize={fontSizes.tertiary} lineHeight={1}>
              {defaultValueFormatter(filteredData.countries.amount)} Countries
            </Metric>
            <Metric fontSize={fontSizes.tertiary} lineHeight={1}>
              {defaultValueFormatter(filteredData.states.amount)} States
            </Metric>
            <Metric fontSize={fontSizes.tertiary} lineHeight={1}>
              {defaultValueFormatter(filteredData.counties.amount)} Counties
            </Metric>
          </>
          <ImageBackground height={175} className="">
            {globe}
          </ImageBackground>
        </HStack>
      </Block>
    ),
    age: (
      <Block>
        <HStack>
          <ImageBackground></ImageBackground>
          <>
            <Title>Average Age</Title>
            <Metric>{defaultValueFormatter(filteredData.age.average)}</Metric>
          </>
          <>
            <div>
              Min:{" "}
              <span className="text-white">
                {defaultValueFormatter(filteredData.age.min)}
              </span>
            </div>
            <div>
              Max:{" "}
              <span className="text-white">
                {defaultValueFormatter(filteredData.age.max)}
              </span>
            </div>
          </>
        </HStack>
      </Block>
    ),
    serviceReg: (
      <Block>
        <HStack>
          <></>
          <>
            <Title>Service Region</Title>
            <SimplePieChart
              data={filteredData.serviceReg.data}
            ></SimplePieChart>
          </>
          <>
            <div className="small lh-sm ms-auto mt-auto text-wrap text-end">
              <a
                href="https://www.irserver2.eku.edu/reports/serviceregion/"
                className="link-light"
                rel="noreferrer"
                target="_blank"
              >
                EKU Service Region
              </a>
            </div>
          </>
        </HStack>
      </Block>
    ),
    majors: (
      <Block backgroundColor="lightgray" color="secondary">
        <Title fontSize={fontSizes.tertiary} textAlign="start">
          Majors
        </Title>
        <ChartScrollContainer>
          <VerticalBarChart
            margin={{
              right: 40,
              bottom: 5,
              left: 40,
              top: 5,
            }}
            yAxisStyle={{ fontSize: "x-small" }}
            tickFormatter={(value) => value}
            {...generateChartProperties("majors")}
            {...colorSchemes.darkGray}
          ></VerticalBarChart>
        </ChartScrollContainer>
      </Block>
    ),
    states: (
      <Block backgroundColor="lightgray" color="secondary">
        <Title fontSize={fontSizes.tertiary} textAlign="start">
          States
        </Title>
        <ChartScrollContainer>
          <VerticalBarChart
            margin={{
              right: 40,
              bottom: 5,
              left: -20,
              top: 5,
            }}
            nameFormatter={abbreviateState}
            {...generateChartProperties("states")}
            {...colorSchemes.darkGray}
          ></VerticalBarChart>
        </ChartScrollContainer>
      </Block>
    ),
    counties: (
      <Block backgroundColor="lightgray" color="secondary">
        <Title fontSize={fontSizes.tertiary} textAlign="start">
          KY Counties
        </Title>
        <ChartScrollContainer>
          <VerticalBarChart
            {...generateChartProperties("counties")}
            {...colorSchemes.darkGray}
          ></VerticalBarChart>
        </ChartScrollContainer>
      </Block>
    ),
    gpa: (
      <Block>
        <HStack>
          <ImageBackground>{star}</ImageBackground>
          <>
            <Title>Average Graduation GPA</Title>
            <Metric>{formatTwoDecimalPlaces(filteredData.gpa.average)}</Metric>
          </>
          <></>
        </HStack>
      </Block>
    ),
    pell: (
      <Block>
        <HStack>
          <ImageBackground>{donate}</ImageBackground>
          <>
            <Title>Pell Recipients</Title>
            <Metric>{defaultValueFormatter(filteredData.pell.amount)}</Metric>
          </>
          <></>
        </HStack>
      </Block>
    ),
    firstGen: (
      <Block>
        <HStack>
          <></>
          <>
            <Title>First Generation</Title>
            <SimplePieChart data={filteredData.firstGen.data}></SimplePieChart>
          </>
          <></>
        </HStack>
      </Block>
    ),
    work: (
      <Block textWrap>
        <Title>Percent of graduates working in kentucky after 3 years</Title>
        <Metric>
          62.5 <span className="text-white-50">%</span>
        </Metric>
        <KYStatsLink></KYStatsLink>
      </Block>
    ),
    level: (
      <Block>
        <HStack>
          <></>
          <>
            <Title>Level</Title>
            <SimplePieChart data={filteredData.level.data}></SimplePieChart>
          </>
          <></>
        </HStack>
      </Block>
    ),
    salary: (
      <Block textWrap>
        <Title>Median salary 3 years after graduation</Title>
        <Metric>
          <span className="text-white-50">$</span> 43,875
        </Metric>
        <KYStatsLink></KYStatsLink>
      </Block>
    ),
  };
};

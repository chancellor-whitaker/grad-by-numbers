import { ChartScrollContainer } from "./components/ChartScrollContainer";
import { formatTwoDecimalPlaces } from "./utils/formatTwoDecimalPlaces";
import { defaultValueFormatter } from "./utils/defaultValueFormatter";
import { useVisualizationData } from "./hooks/useVisualizationData";
import { VerticalBarChart } from "./components/VerticalBarChart";
import { ImageBackground } from "./components/ImageBackground";
import { SimplePieChart } from "./components/SimplePieChart";
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
  const { filteredData } = useVisualizationData();

  // console.log(filteredData);

  const blocks = createBlocks(filteredData);

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

// ? baccalaureate--bachelors
// * scholar icon not w-100,
// * masters degree--masters
// * remove "degree"
// * abbreviate "certificate"
// * different text color on pie charts (white doesn't show well)
// * add tooltips back
// * format numbers
// wrapping
// x overflow in scrollable charts

const createBlocks = (data) => {
  return {
    awards: (
      <Block>
        <HStack columnWidths={"auto"}>
          <>
            <ImageBackground height={200} className=""></ImageBackground>
          </>
          <div className="position-relative w-100">
            <VerticalBarChart
              data={data.awards.data}
              {...colorSchemes.maroon}
            ></VerticalBarChart>
            <div className="position-absolute bottom-0 end-0">
              <div>
                <Metric displayFontSize={2} className="me-3" as="span">
                  {defaultValueFormatter(data.awards.amount)}
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
              {defaultValueFormatter(data.countries.amount)} Countries
            </Metric>
            <Metric fontSize={fontSizes.tertiary} lineHeight={1}>
              {defaultValueFormatter(data.states.amount)} States
            </Metric>
            <Metric fontSize={fontSizes.tertiary} lineHeight={1}>
              {defaultValueFormatter(data.counties.amount)} Counties
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
            <Metric>{defaultValueFormatter(data.age.average)}</Metric>
          </>
          <>
            <div>
              Min:{" "}
              <span className="text-white">
                {defaultValueFormatter(data.age.min)}
              </span>
            </div>
            <div>
              Max:{" "}
              <span className="text-white">
                {defaultValueFormatter(data.age.max)}
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
            <SimplePieChart data={data.serviceReg.data}></SimplePieChart>
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
    counties: (
      <Block backgroundColor="lightgray" color="secondary">
        <Title fontSize={fontSizes.tertiary} textAlign="start">
          KY Counties
        </Title>
        <ChartScrollContainer>
          <VerticalBarChart
            data={data.counties.data}
            {...colorSchemes.darkGray}
          ></VerticalBarChart>
        </ChartScrollContainer>
      </Block>
    ),
    majors: (
      <Block backgroundColor="lightgray" color="secondary">
        <Title fontSize={fontSizes.tertiary} textAlign="start">
          Majors
        </Title>
        <ChartScrollContainer>
          <VerticalBarChart
            data={data.majors.data}
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
            data={data.states.data}
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
            <Metric>{formatTwoDecimalPlaces(data.gpa.average)}</Metric>
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
            <Metric>{defaultValueFormatter(data.pell.amount)}</Metric>
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
            <SimplePieChart data={data.firstGen.data}></SimplePieChart>
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
    salary: (
      <Block textWrap>
        <Title>Median salary 3 years after graduation</Title>
        <Metric>
          <span className="text-white-50">$</span> 43,875
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
            <SimplePieChart data={data.level.data}></SimplePieChart>
          </>
          <></>
        </HStack>
      </Block>
    ),
  };
};

import { useVisualizationData } from "./hooks/useVisualizationData";
import { ServiceRegionLink } from "./components/ServiceRegionLink";
import { VerticalBarChart } from "./components/VerticalBarChart";
import { ImageBackground } from "./components/ImageBackground";
import { SimplePieChart } from "./components/SimplePieChart";
import { KYStatsLink } from "./components/KYStatsLink";
import { colorSchemes } from "./utils/colorSchemes";
import { imageWidths } from "./utils/imageWidths";
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

  console.log(filteredData);

  const blocks = createBlocks(filteredData);

  return (
    <main className="container">
      <div className="my-3">
        <div className="bd-example-flex">
          <VStack>
            <HStack>
              {blocks.awards}
              <>
                {blocks.firstGen}
                {blocks.serviceReg}
              </>
              <>
                {blocks.gpa}
                {blocks.pell}
                {blocks.age}
              </>
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

const createBlocks = (data) => {
  return {
    locations: (
      <Block>
        <HStack className="my-auto">
          <>
            <Title>Graduates represent</Title>
            <Metric fontSize={fontSizes.tertiary} lineHeight={1}>
              {`${data.countries.amount}`} countries
            </Metric>
            <Metric fontSize={fontSizes.tertiary} lineHeight={1}>
              {`${data.states.amount}`} states
            </Metric>
            <Metric fontSize={fontSizes.tertiary} lineHeight={1}>
              {`${data.counties.amount}`} counties
            </Metric>
          </>
          <ImageBackground width={imageWidths.locations} className="">
            {globe}
          </ImageBackground>
        </HStack>
      </Block>
    ),
    age: (
      <Block>
        <HStack className="my-auto">
          <ImageBackground></ImageBackground>
          <>
            <Title>Average age</Title>
            <Metric>{`${data.age.average}`}</Metric>
          </>
          <>
            <div>
              Min: <span className="text-white">{`${data.age.min}`}</span>
            </div>
            <div>
              Max: <span className="text-white">{`${data.age.max}`}</span>
            </div>
          </>
        </HStack>
      </Block>
    ),
    awards: (
      <Block>
        <HStack className="mt-auto">
          <ImageBackground width={imageWidths.awards}></ImageBackground>
          <div className="fw-bold">
            <Metric as="span">{`${data.awards.amount}`}</Metric> awards
          </div>
          <></>
        </HStack>
        <VerticalBarChart {...colorSchemes.maroon}></VerticalBarChart>
        <SimplePieChart className="mb-auto"></SimplePieChart>
      </Block>
    ),
    counties: (
      <Block backgroundColor="lightgray" color="secondary">
        <Title
          fontSize={fontSizes.tertiary}
          className="mt-auto"
          textAlign="start"
        >
          Ky counties
        </Title>
        <VerticalBarChart
          className="mb-auto"
          {...colorSchemes.darkGray}
        ></VerticalBarChart>
      </Block>
    ),
    states: (
      <Block backgroundColor="lightgray" color="secondary">
        <Title
          fontSize={fontSizes.tertiary}
          className="mt-auto"
          textAlign="start"
        >
          States
        </Title>
        <VerticalBarChart
          className="mb-auto"
          {...colorSchemes.darkGray}
        ></VerticalBarChart>
      </Block>
    ),
    majors: (
      <Block backgroundColor="lightgray" color="secondary">
        <Title
          fontSize={fontSizes.tertiary}
          className="mt-auto"
          textAlign="start"
        >
          Majors
        </Title>
        <VerticalBarChart
          className="mb-auto"
          {...colorSchemes.darkGray}
        ></VerticalBarChart>
      </Block>
    ),
    serviceReg: (
      <Block>
        <HStack className="mt-auto">
          <></>
          <>
            <Title>Service region</Title>
            <SimplePieChart></SimplePieChart>
          </>
          <></>
        </HStack>
        <div className="mt-auto"></div>
        <ServiceRegionLink></ServiceRegionLink>
      </Block>
    ),
    work: (
      <Block textWrap>
        <Title className="mt-auto">
          Percent of graduates working in kentucky after 3 years
        </Title>
        <Metric>
          62.5 <span className="text-white-50">%</span>
        </Metric>
        <div className="mt-auto"></div>
        <KYStatsLink></KYStatsLink>
      </Block>
    ),
    salary: (
      <Block textWrap>
        <Title className="mt-auto">
          Median salary 3 years after graduation
        </Title>
        <Metric>
          <span className="text-white-50">$</span> 43,875
        </Metric>
        <div className="mt-auto"></div>
        <KYStatsLink></KYStatsLink>
      </Block>
    ),
    gpa: (
      <Block>
        <HStack className="my-auto">
          <ImageBackground>{star}</ImageBackground>
          <>
            <Title>Average graduation gpa</Title>
            <Metric>{`${data.gpa.average}`}</Metric>
          </>
          <></>
        </HStack>
      </Block>
    ),
    pell: (
      <Block>
        <HStack className="my-auto">
          <ImageBackground>{donate}</ImageBackground>
          <>
            <Title>Pell recipients</Title>
            <Metric>{`${data.pell.amount}`}</Metric>
          </>
          <></>
        </HStack>
      </Block>
    ),
    firstGen: (
      <Block>
        <HStack className="my-auto">
          <></>
          <>
            <Title>First generation</Title>
            <SimplePieChart></SimplePieChart>
          </>
          <></>
        </HStack>
      </Block>
    ),
  };
};

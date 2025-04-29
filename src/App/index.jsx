import { useVisualizationData } from "./hooks/useVisualizationData";
import { ImageBackground } from "./components/ImageBackground";
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

// creates chart data context

export default function App() {
  const { data } = useVisualizationData();

  console.log(data);

  const chartPlaceholder = <div style={{ height: 50 }}>Chart</div>;

  const serviceRegionLink = (
    <HStack className="small">
      <></>
      <div className="lh-1 ms-auto">
        <a
          href="https://www.irserver2.eku.edu/reports/serviceregion/"
          className="link-light"
          rel="noreferrer"
          target="_blank"
        >
          EKU service region
        </a>
      </div>
    </HStack>
  );

  const kyStatsSource = (
    <HStack className="small">
      <></>
      <>
        <div className="lh-1 text-white-50 ms-auto">
          Source:{" "}
          <a
            className="link-light link-opacity-50 link-underline-opacity-50"
            href="https://kystats.ky.gov/Reports/Tableau/2024_PSFR"
            rel="noreferrer"
            target="_blank"
          >
            KYSTATS
          </a>
        </div>
        <div className="lh-1 text-white-50 ms-auto">(Non-filtering)</div>
      </>
    </HStack>
  );

  const titles = {
    work: "Percent of graduates working in kentucky after 3 years",
    salary: "Median salary 3 years after graduation",
    locations: "Graduates represent",
    gpa: "Average graduation gpa",
    firstGen: "First generation",
    serviceReg: "Service region",
    pell: "Pell recipients",
    counties: "Ky counties",
    age: "Average age",
    awards: "awards",
    states: "States",
    majors: "Majors",
  };

  const blocks = {
    locations: (
      <Block>
        <HStack>
          <>
            <Title>{titles.locations}</Title>
            <Metric fontSize={fontSizes.tertiary} lineHeight={1}>
              {data.countries.amount} countries
            </Metric>
            <Metric fontSize={fontSizes.tertiary} lineHeight={1}>
              {data.states.amount} states
            </Metric>
            <Metric fontSize={fontSizes.tertiary} lineHeight={1}>
              {data.counties.amount} counties
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
        <HStack>
          <ImageBackground></ImageBackground>
          <>
            <Title>{titles.age}</Title>
            <Metric>{data.age.average}</Metric>
          </>
          <>
            <div>
              Min: <span className="text-white">{data.age.min}</span>
            </div>
            <div>
              Max: <span className="text-white">{data.age.max}</span>
            </div>
          </>
        </HStack>
      </Block>
    ),
    awards: (
      <Block>
        <HStack>
          <ImageBackground width={imageWidths.awards}></ImageBackground>
          <div className="fw-bold">
            <Metric as="span">{data.awards.amount}</Metric> {titles.awards}
          </div>
          <></>
        </HStack>
        {chartPlaceholder}
        {chartPlaceholder}
      </Block>
    ),
    serviceReg: (
      <Block>
        <HStack>
          <></>
          <>
            <Title>{titles.serviceReg}</Title>
            {chartPlaceholder}
          </>
          <></>
        </HStack>
        <div className="mt-auto"></div>
        {serviceRegionLink}
      </Block>
    ),
    pell: (
      <Block>
        <HStack>
          <ImageBackground>{donate}</ImageBackground>
          <>
            <Title>{titles.pell}</Title>
            <Metric>{data.pell.amount}</Metric>
          </>
          <></>
        </HStack>
      </Block>
    ),
    gpa: (
      <Block>
        <HStack>
          <ImageBackground>{star}</ImageBackground>
          <>
            <Title>{titles.gpa}</Title>
            <Metric>{data.gpa.average}</Metric>
          </>
          <></>
        </HStack>
      </Block>
    ),
    salary: (
      <Block textWrap>
        <Title>{titles.salary}</Title>
        <Metric>
          <span className="text-white-50">$</span> 43,875
        </Metric>
        <div className="mt-auto"></div>
        {kyStatsSource}
      </Block>
    ),
    work: (
      <Block textWrap>
        <Title>{titles.work}</Title>
        <Metric>
          62.5 <span className="text-white-50">%</span>
        </Metric>
        <div className="mt-auto"></div>
        {kyStatsSource}
      </Block>
    ),
    counties: (
      <Block backgroundColor="lightgray" color="secondary">
        <Title fontSize={fontSizes.tertiary} textAlign="start">
          {titles.counties}
        </Title>
        {chartPlaceholder}
      </Block>
    ),
    states: (
      <Block backgroundColor="lightgray" color="secondary">
        <Title fontSize={fontSizes.tertiary} textAlign="start">
          {titles.states}
        </Title>
        {chartPlaceholder}
      </Block>
    ),
    majors: (
      <Block backgroundColor="lightgray" color="secondary">
        <Title fontSize={fontSizes.tertiary} textAlign="start">
          {titles.majors}
        </Title>
        {chartPlaceholder}
      </Block>
    ),
    firstGen: (
      <Block>
        <HStack>
          <></>
          <>
            <Title>{titles.firstGen}</Title>
            {chartPlaceholder}
          </>
          <></>
        </HStack>
      </Block>
    ),
  };

  return (
    <>
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
    </>
  );
}

import scholar from "./assets/scholar.png";
import donate from "./assets/donate.png";
import globe from "./assets/globe.png";
import star from "./assets/star.png";

const fontSizes = { secondary: 1, tertiary: 4, primary: 6 };

export default function Component() {
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
              13 countries
            </Metric>
            <Metric fontSize={fontSizes.tertiary} lineHeight={1}>
              42 states
            </Metric>
            <Metric fontSize={fontSizes.tertiary} lineHeight={1}>
              101 counties
            </Metric>
          </>
          <ImageBackground className="" height={200}>
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
            <Metric>25</Metric>
          </>
          <>
            <div>
              Min: <span className="text-white">19</span>
            </div>
            <div>
              Max: <span className="text-white">74</span>
            </div>
          </>
        </HStack>
      </Block>
    ),
    awards: (
      <Block>
        <HStack>
          <ImageBackground height={100}></ImageBackground>
          <div className="fw-bold">
            <Metric as="span">1,538</Metric> {titles.awards}
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
            <Metric>692</Metric>
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
    gpa: (
      <Block>
        <HStack>
          <ImageBackground>{star}</ImageBackground>
          <>
            <Title>{titles.gpa}</Title>
            <Metric>3.38</Metric>
          </>
          <></>
        </HStack>
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

const helpers = {
  getAspectRatio: (asset) => {
    if (asset === star) return 466 / 445;

    if (asset === donate) return 250 / 223;

    if (asset === scholar) return 73 / 86;

    if (asset === globe) return 14 / 17;
  },
  getWidth: (asset, height = 75) => {
    return height * getAspectRatio(asset);
  },
};

const components = {
  Block: ({
    children = <div className="p-2">Flex item</div>,
    backgroundColor = "maroon",
    color = "bronze",
    className = "",
    shadow = "sm",
    padding = 2,
    rounded = 4,
    textWrap,
  }) => {
    return (
      <VStack
        className={[
          `bg-${backgroundColor} text-${color} rounded-${rounded} shadow-${shadow} p-${padding}`,
          textWrap ? "text-wrap" : "text-nowrap",
          className,
        ]
          .filter((string) => string)
          .join(" ")}
      >
        {children}
      </VStack>
    );
  },
  HStack: ({ className = "", children, gap = 2 }) => {
    const columns = [children]
      .filter((child) => child)
      .flat()
      .map((child, index) => (
        <VStack
          className="align-items-center justify-content-center"
          key={index}
        >
          {child}
        </VStack>
      ));

    return (
      <div
        className={[`hstack gap-${gap}`, className]
          .filter((string) => string)
          .join(" ")}
      >
        {columns}
      </div>
    );
  },
  Metric: ({
    fontSize = fontSizes.secondary,
    textAlign = "center",
    fontWeight = "bold",
    color = "white",
    lineHeight = 1,
    className = "",
    as = "div",
    children,
  }) => {
    const As = as;

    return (
      <As
        className={[
          `lh-${lineHeight} text-${textAlign} fs-${fontSize} text-${color} fw-${fontWeight}`,
          className,
        ]
          .filter((string) => string)
          .join(" ")}
      >
        {children}
      </As>
    );
  },
  ImageBackground: ({
    children = scholar,
    height = 75,
    width = getWidth(children, height),
    className = "me-auto",
  }) => {
    return (
      <div
        style={{
          backgroundImage: `url("${children}")`,
          backgroundSize: "contain",
          cursor: "inherit",
          height,
          width,
        }}
        className={["imageBackground", className]
          .filter((string) => string)
          .join(" ")}
      ></div>
    );
  },
  Title: ({
    fontSize = fontSizes.primary,
    textAlign = "center",
    fontWeight = "bold",
    className = "",
    children,
  }) => {
    return (
      <div
        className={[
          `fs-${fontSize} text-${textAlign} fw-${fontWeight}`,
          className,
        ]
          .filter((string) => string)
          .join(" ")}
      >
        {children}
      </div>
    );
  },
  VStack: ({ className = "", width = 100, children, gap = 2 }) => {
    return (
      <div
        className={[`vstack gap-${gap} w-${width}`, className]
          .filter((string) => string)
          .join(" ")}
      >
        {children}
      </div>
    );
  },
};

const { ImageBackground, Metric, VStack, HStack, Title, Block } = components;

const { getAspectRatio, getWidth } = helpers;

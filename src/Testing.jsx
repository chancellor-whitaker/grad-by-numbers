import { useEffect, useState } from "react";
import { csv } from "d3-fetch";

import scholar from "./assets/scholar.png";
import donate from "./assets/donate.png";
import globe from "./assets/globe.png";
import star from "./assets/star.png";

// creates chart data context

const useVisualizationData = () => {
  const [filterBy, setFilterBy] = useState([]);

  const noFilterActive = filterBy.length !== 2;

  const data = usePromise(promise);

  const filteredData = noFilterActive
    ? data
    : data.filter(({ [filterBy[0]]: value }) => value === filterBy[1]);

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

  return vizData;
};

export default function Component() {
  const data = useVisualizationData();

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
          <ImageBackground height={100}></ImageBackground>
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

const constants = {
  fontSizes: { secondary: 1, tertiary: 4, primary: 6 },
  promise: csv("data.csv"),
};

const helpers = {
  isStringNumeric: (string) => {
    const method1 = (value) => !Number.isNaN(value);

    const method2 = (value) => /^[+-]?\d+(\.\d+)?$/.test(value);

    const method3 = (value) => !Number.isNaN(Number(value));

    const method4 = (value) => Number.isFinite(+value);

    const method5 = (value) => value == Number.parseFloat(value);

    return ![method1, method2, method3, method4, method5]
      .map((method) => method(string))
      .some((value) => !value);
  },
  getChartData: (summary, field, ratio) => {
    const valueKey = ratio ? "ratio" : "count";

    const object = summary[field]?.values ? summary[field]?.values : {};

    return Object.entries(object)
      .map(([name, { [valueKey]: value }]) => ({
        value,
        field,
        name,
      }))
      .filter(({ name }) => name)
      .sort(({ value: a }, { value: b }) => b - a);
  },
  getAspectRatio: (asset) => {
    if (asset === star) return 466 / 445;

    if (asset === donate) return 250 / 223;

    if (asset === scholar) return 73 / 86;

    if (asset === globe) return 14 / 17;
  },
  sumArray: (arr) => {
    return arr.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  },
  roundToTwo: (num, x = 2) => {
    return +(Math.round(num + `e+${x}`) + `e-${x}`);
  },
  getWidth: (asset, height = 75) => {
    return height * getAspectRatio(asset);
  },
};

const hooks = {
  usePromise: (promise) => {
    const [state, setState] = useState(null);

    useEffect(() => {
      if (promise) {
        let ignore = false;

        promise.then((response) => !ignore && setState(response));

        return () => {
          ignore = true;
        };
      }
    }, [promise]);

    return state;
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

const { usePromise } = hooks;

const {
  isStringNumeric,
  getAspectRatio,
  getChartData,
  roundToTwo,
  getWidth,
  sumArray,
} = helpers;

const { fontSizes, promise } = constants;

const summarizeData = (data) => {
  const rows = [data].filter((element) => element).flat();

  const object = {};

  rows.forEach((row) => {
    Object.keys(row).forEach((field) => {
      if (!(field in object)) {
        object[field] = { isNumeric: true, distinct: 0, values: {}, sum: 0 };
      }

      object[field].sum++;

      const value = row[field];

      if (!(value in object[field].values)) {
        if (!isStringNumeric(`${value}`)) object[field].isNumeric = false;

        object[field].values[value] = 0;

        object[field].distinct++;
      }

      object[field].values[value]++;
    });
  });

  return Object.fromEntries(
    Object.entries(object).map(
      ([field, { isNumeric, distinct, values, sum }]) => [
        field,
        {
          average: !isNumeric
            ? null
            : sumArray(
                Object.entries(values).map(
                  ([value, count]) => Number(value) * count
                )
              ) / sum,
          values: Object.fromEntries(
            Object.entries(values).map(([value, count]) => [
              value,
              { ratio: count / sum, count },
            ])
          ),
          min: !isNumeric
            ? null
            : Math.min(
                ...Object.entries(values).map(([value]) => Number(value))
              ),
          max: !isNumeric
            ? null
            : Math.max(
                ...Object.entries(values).map(([value]) => Number(value))
              ),
          isNumeric,
          distinct,
          sum,
        },
      ]
    )
  );
};

const getVizData = (summary) => ({
  level: {
    data: getChartData(summary, "SHRDGMR_LEVL_CODE", true).map(
      ({ value, ...rest }) => ({ value: roundToTwo(value, 4), ...rest })
    ),
    field: "SHRDGMR_LEVL_CODE",
    chart: "pie",
  },
  age: {
    average: Math.floor(summary["Age"]?.average),
    max: Math.floor(summary["Age"]?.max),
    min: Math.floor(summary["Age"]?.min),
    title: "Average Age",
    field: "Age",
  },
  states: {
    amount: getChartData(summary, "STATENAME").length,
    data: getChartData(summary, "STATENAME"),
    field: "STATENAME",
    title: "States",
    chart: "bar",
  },
  awards: {
    title: `${summary["acat_desc"]?.sum} Awards`,
    data: getChartData(summary, "acat_desc"),
    amount: summary["acat_desc"]?.sum,
    field: "acat_desc",
  },
  pell: {
    amount: getChartData(summary, "EKU_Low_Inc").find(
      ({ name }) => name === "Y"
    )?.value,
    title: "Pell Recipients",
    field: "EKU_Low_Inc",
  },
  counties: {
    amount: getChartData(summary, "COUNTYNM").length,
    data: getChartData(summary, "COUNTYNM"),
    title: "KY Counties",
    field: "COUNTYNM",
  },
  gpa: {
    average: roundToTwo(summary["Overall_GPA_End_of_Term"]?.average),
    field: "Overall_GPA_End_of_Term",
    title: "Average Graduation GPA",
  },
  serviceReg: {
    data: getChartData(summary, "EKU_Service_Region"),
    field: "EKU_Service_Region",
    title: "Service Region",
  },
  firstGen: {
    data: getChartData(summary, "FirstGenInd"),
    title: "First Generation",
    field: "FirstGenInd",
  },
  majors: {
    data: getChartData(summary, "major_desc"),
    field: "major_desc",
    title: "Majors",
  },
  countries: {
    amount: getChartData(summary, "country").length,
    field: "country",
  },
});

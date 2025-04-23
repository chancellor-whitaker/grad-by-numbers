import { useState } from "react";

import { SimpleBarChart } from "./components/SimpleBarChart";
import { SimplePieChart } from "./components/SimplePieChart";
import { summarizeData } from "./utils/summarizeData";
import { chartHeight } from "./utils/chartHeight";
import { usePromise } from "./hooks/usePromise";
import { getVizData } from "./utils/getVizData";
import scholar from "./assets/scholar.png";
import { promise } from "./utils/promise";
import donate from "./assets/donate.png";
import { colors } from "./utils/colors";
import globe from "./assets/globe.png";
import star from "./assets/star.png";

export default function App() {
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
    // console.log(props);

    const newPair = [props[0].field, props[0].name];

    setFilterBy((currentPair) => {
      if (currentPair.length !== 2) return newPair;

      if (currentPair[0] === newPair[0] && currentPair[1] === newPair[1]) {
        return [];
      }

      return newPair;
    });
  };

  const generateBarChartSection = (key, props) => {
    return (
      <div
        className="overflow-auto small fw-normal"
        style={{ height: chartHeight }}
      >
        <SimpleBarChart
          showOriginalLabels={showOriginalLabels(vizData[key].field)}
          filteredData={filteredVizData[key].data}
          data={vizData[key].data}
          onClick={handleClick}
          {...props}
        ></SimpleBarChart>
      </div>
    );
  };

  const generatePieChartSection = (key, props, height = chartHeight) => {
    return (
      <div className="overflow-auto small fw-normal" style={{ height }}>
        <SimplePieChart
          showOriginalLabels={showOriginalLabels(vizData[key].field)}
          filteredData={filteredVizData[key].data}
          data={vizData[key].data}
          onClick={handleClick}
          {...props}
        ></SimplePieChart>
      </div>
    );
  };

  return (
    <main className="container">
      <div className="my-3">
        <FlexColumn>
          <FlexRow>
            <Col>
              <Section>
                <FlexColumn>
                  <FlexRow wrap>
                    <Col>
                      {/* <Icon className="fs-1">mortarboard-fill</Icon> */}
                      <div
                        style={{
                          backgroundImage: `url("${scholar}")`,
                          backgroundSize: "contain",
                          cursor: "inherit",
                          height: 100,
                          width: 85,
                        }}
                        className="imageBackground"
                      />
                    </Col>
                    <Col>
                      <FlexRow gap={2}>
                        <div className="fs-1 text-white">
                          {filteredVizData.award.amount}
                        </div>
                        <div>Awards</div>
                      </FlexRow>
                    </Col>
                    <Col></Col>
                  </FlexRow>
                  <div className="position-relative">
                    {generateBarChartSection("award")}
                    {/* <div className="position-absolute w-100 top-0">
                  {generatePieChartSection("level")}
                </div> */}
                  </div>
                </FlexColumn>
              </Section>
            </Col>
            <Col>
              <FlexColumn>
                <Section>
                  <FlexColumn gap={1}>
                    <CenteredText>First Generation</CenteredText>
                    <div>{generatePieChartSection("firstGeneration")}</div>
                  </FlexColumn>
                </Section>
                <Section>
                  <FlexColumn gap={1}>
                    <CenteredText>Service Region</CenteredText>
                    <div>{generatePieChartSection("serviceRegion")}</div>
                  </FlexColumn>
                </Section>
              </FlexColumn>
            </Col>
            <Col>
              <FlexColumn>
                <Section>
                  <FlexRow wrap>
                    <Col>
                      {/* <Icon className="fs-1">star</Icon> */}
                      <div
                        style={{
                          backgroundImage: `url("${star}")`,
                          backgroundSize: "contain",
                          cursor: "inherit",
                          height: 70,
                          width: 74,
                        }}
                        className="imageBackground"
                      />
                    </Col>
                    <Col>
                      <FlexColumn gap={0}>
                        <CenteredText>Average Graduation GPA</CenteredText>
                        <CenteredText className="fs-1 text-white">
                          {filteredVizData.gpa.average}
                        </CenteredText>
                      </FlexColumn>
                    </Col>
                    <Col></Col>
                  </FlexRow>
                </Section>
                <Section>
                  <FlexRow wrap>
                    <Col>
                      {/* <Icon className="fs-1">currency-dollar</Icon> */}
                      <div
                        style={{
                          backgroundImage: `url("${donate}")`,
                          backgroundSize: "contain",
                          cursor: "inherit",
                          height: 70,
                          width: 79,
                        }}
                        className="imageBackground"
                      />
                    </Col>
                    <Col>
                      <FlexColumn gap={0}>
                        <CenteredText>Pell Recipients</CenteredText>
                        <CenteredText className="fs-1 text-white">
                          {filteredVizData.pellRecipient.amount}
                        </CenteredText>
                      </FlexColumn>
                    </Col>
                    <Col></Col>
                  </FlexRow>
                </Section>
                <Section>
                  <FlexRow wrap>
                    <Col>
                      {/* <Icon className="fs-1">mortarboard-fill</Icon> */}
                      <div
                        style={{
                          backgroundImage: `url("${scholar}")`,
                          backgroundSize: "contain",
                          cursor: "inherit",
                          height: 70,
                          width: 60,
                        }}
                        className="imageBackground"
                      />
                    </Col>
                    <Col>
                      <FlexColumn gap={0}>
                        <CenteredText>Average Age</CenteredText>
                        <CenteredText className="fs-1 text-white">
                          {filteredVizData.age.average}
                        </CenteredText>
                      </FlexColumn>
                    </Col>
                    <Col>
                      <FlexColumn className="text-end fw-normal" gap={0}>
                        <div>
                          Min:{" "}
                          <span className="text-white">
                            {filteredVizData.age.min}
                          </span>
                        </div>
                        <div>
                          Max:{" "}
                          <span className="text-white">
                            {filteredVizData.age.max}
                          </span>
                        </div>
                      </FlexColumn>
                    </Col>
                  </FlexRow>
                </Section>
              </FlexColumn>
            </Col>
          </FlexRow>
          <FlexRow>
            <Col>
              <div>
                <Section className="rounded-bottom-0" bg="lightgray">
                  <div>
                    {generateBarChartSection("state", {
                      colorScheme: colors.alternateScheme,
                      textColor: "black",
                    })}
                  </div>
                </Section>
                <Runner>States</Runner>
              </div>
            </Col>
            <Col>
              <div>
                <Section className="rounded-bottom-0" bg="lightgray">
                  <div>
                    {generateBarChartSection("county", {
                      colorScheme: colors.alternateScheme,
                      textColor: "black",
                    })}
                  </div>
                </Section>
                <Runner>KY Counties</Runner>
              </div>
            </Col>
            <Col>
              <div>
                <Section className="rounded-bottom-0" bg="lightgray">
                  <div>
                    {generateBarChartSection("major", {
                      colorScheme: colors.alternateScheme,
                      textColor: "black",
                      yAxisWidth: 125,
                    })}
                  </div>
                </Section>
                <Runner>Majors</Runner>
              </div>
            </Col>
          </FlexRow>
          <FlexRow>
            <Col>
              <Section>
                <FlexRow>
                  <Col>
                    <FlexColumn gap={0}>
                      <CenteredText className="fs-5">
                        Graduates represent
                      </CenteredText>
                      <CenteredText className="fs-3 text-white">
                        {filteredVizData.country.amount} countries
                      </CenteredText>
                      <CenteredText className="fs-3 text-white">
                        {filteredVizData.state.amount} states
                      </CenteredText>
                      <CenteredText className="fs-3 text-white">
                        {filteredVizData.county.amount} counties
                      </CenteredText>
                    </FlexColumn>
                  </Col>
                  <Col>
                    <div
                      style={{
                        backgroundImage: `url("${globe}")`,
                        backgroundSize: "contain",
                        cursor: "inherit",
                        height: 220,
                        width: 182,
                      }}
                      className="imageBackground"
                    />
                  </Col>
                </FlexRow>
              </Section>
            </Col>
            <Col></Col>
            <Col></Col>
          </FlexRow>
        </FlexColumn>
      </div>
    </main>
  );
}

const Runner = ({
  defaultClassName = "bg-maroon text-bronze px-2 py-1 fs-4 fw-bold rounded-top-0 rounded-1",
  className = "",
  as = "div",
  ...rest
}) => {
  const As = as;

  return (
    <div className="position-relative">
      <As
        className={[defaultClassName, className]
          .filter((value) => value)
          .join(" ")}
        {...rest}
      ></As>
      <div className="position-absolute start-100 top-0">
        <div className="arrow-right"></div>
      </div>
    </div>
  );
};

const CenteredText = ({
  defaultClassName = "text-center",
  className = "",
  as = "div",
  ...rest
}) => {
  const As = as;

  return (
    <As
      className={[defaultClassName, className]
        .filter((value) => value)
        .join(" ")}
      {...rest}
    ></As>
  );
};

const Placeholder = ({
  defaultClassName = "border",
  style = { height: 100 },
  className = "",
  as = "div",
  ...rest
}) => {
  const As = as;

  return (
    <As
      className={[defaultClassName, className]
        .filter((value) => value)
        .join(" ")}
      style={style}
      {...rest}
    ></As>
  );
};

const Icon = ({
  defaultClassName = "bi",
  className = "",
  children = "",
  as = "i",
  ...rest
}) => {
  const As = as;

  return (
    <As
      className={[defaultClassName, className, `bi-${children}`]
        .filter((value) => value)
        .join(" ")}
      {...rest}
    ></As>
  );
};

const Col = ({
  defaultClassName = "col",
  className = "",
  as = "div",
  ...rest
}) => {
  const As = as;

  return (
    <As
      className={[defaultClassName, className]
        .filter((value) => value)
        .join(" ")}
      {...rest}
    ></As>
  );
};

const Section = ({
  defaultClassName = "p-3 text-bronze fw-bold rounded shadow-sm",
  className = "",
  bg = "maroon",
  as = "div",
  ...rest
}) => {
  const As = as;

  return (
    <As
      className={[defaultClassName, className, `bg-${bg}`]
        .filter((value) => value)
        .join(" ")}
      {...rest}
    ></As>
  );
};

const FlexColumn = ({
  defaultClassName = "d-flex flex-column",
  className = "",
  as = "div",
  gap = 3,
  ...rest
}) => {
  const As = as;

  return (
    <As
      className={[defaultClassName, className, `gap-${gap}`]
        .filter((value) => value)
        .join(" ")}
      {...rest}
    ></As>
  );
};

const FlexRow = ({
  defaultClassName = "d-flex flex-row align-items-center justify-content-center",
  className = "",
  wrap = false,
  as = "div",
  gap = 3,
  ...rest
}) => {
  const As = as;

  return (
    <As
      className={[
        defaultClassName,
        className,
        wrap ? "flex-wrap" : "",
        `gap-${gap}`,
      ]
        .filter((value) => value)
        .join(" ")}
      {...rest}
    ></As>
  );
};

// create bootstrap components

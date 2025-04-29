import { HStack } from "./HStack";

export const ServiceRegionLink = ({ className = "" }) => {
  return (
    <HStack
      className={["small", className].filter((string) => string).join(" ")}
    >
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
};

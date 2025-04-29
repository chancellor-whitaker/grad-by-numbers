import { HStack } from "./HStack";

export const KYStatsLink = ({ className = "" }) => {
  return (
    <HStack
      className={["small", className].filter((string) => string).join(" ")}
    >
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
};

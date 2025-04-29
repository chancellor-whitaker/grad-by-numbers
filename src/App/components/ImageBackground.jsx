// import { imageWidths } from "../utils/imageWidths";
import scholar from "../assets/scholar.png";
import donate from "../assets/donate.png";
import globe from "../assets/globe.png";
import star from "../assets/star.png";

export const ImageBackground = ({
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
};

const getWidth = (asset, x = 75) => {
  return x * getAspectRatio(asset);
};

// const getHeight = (asset, x = imageWidths.default) => {
//   return x * getAspectRatio(asset, true);
// };

const getAspectRatio = (asset, findingHeight) => {
  const assets = [star, donate, scholar, globe];

  const ratios = [
    { height: 445, width: 466 },
    { height: 223, width: 250 },
    { height: 86, width: 73 },
    { height: 17, width: 14 },
  ];

  const index = assets.indexOf(asset);

  const ratio = ratios[index];

  if (findingHeight) {
    return ratio.height / ratio.width;
  }

  return ratio.width / ratio.height;
};

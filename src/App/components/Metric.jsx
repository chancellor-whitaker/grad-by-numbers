import { fontSizes } from "../utils/fontSizes";

export const Metric = ({
  fontSize = fontSizes.secondary,
  textAlign = "center",
  fontWeight = "bold",
  color = "white",
  displayFontSize,
  lineHeight = 1,
  className = "",
  as = "div",
  children,
}) => {
  const As = as;

  return (
    <As
      className={[
        `lh-${lineHeight} text-${textAlign} text-${color} fw-${fontWeight}`,
        className,
        displayFontSize ? `display-${displayFontSize}` : `fs-${fontSize}`,
      ]
        .filter((string) => string)
        .join(" ")}
    >
      {children}
    </As>
  );
};

import { fontSizes } from "../utils/fontSizes";

export const Metric = ({
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
};

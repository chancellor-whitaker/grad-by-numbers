import { fontSizes } from "../utils/fontSizes";

export const Title = ({
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
};

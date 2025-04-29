import { defaultGap } from "../utils/defaultGap";

export const VStack = ({
  gap = defaultGap.vertical,
  className = "",
  width = 100,
  children,
}) => {
  return (
    <div
      className={[`vstack gap-${gap} w-${width}`, className]
        .filter((string) => string)
        .join(" ")}
    >
      {children}
    </div>
  );
};

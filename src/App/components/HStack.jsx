import { defaultGap } from "../utils/defaultGap";
import { VStack } from "./VStack";

export const HStack = ({
  gap = defaultGap.horizontal,
  className = "",
  columnWidths,
  children,
}) => {
  const makeArray = (param) => [param].filter((child) => child).flat();

  const elements = makeArray(children);

  const widths = elements.map(() => 100);

  const declaredWidths = makeArray(columnWidths);

  declaredWidths.forEach((width, index) => (widths[index] = width));

  const columns = elements.map((child, index) => (
    <VStack
      className="align-items-center justify-content-center"
      width={widths[index]}
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
};

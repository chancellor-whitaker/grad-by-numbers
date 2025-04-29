import { defaultGap } from "../utils/defaultGap";
import { VStack } from "./VStack";

export const HStack = ({
  gap = defaultGap.horizontal,
  className = "",
  children,
}) => {
  const columns = [children]
    .filter((child) => child)
    .flat()
    .map((child, index) => (
      <VStack className="align-items-center justify-content-center" key={index}>
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

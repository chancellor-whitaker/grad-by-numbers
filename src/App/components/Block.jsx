import { VStack } from "./VStack";

export const Block = ({
  children = <div className="p-2">Flex item</div>,
  backgroundColor = "maroon",
  color = "bronze",
  className = "",
  shadow = "sm",
  padding = 2,
  rounded = 4,
  textWrap,
}) => {
  return (
    <VStack
      className={[
        `bg-${backgroundColor} text-${color} rounded-${rounded} shadow-${shadow} p-${padding}`,
        textWrap ? "text-wrap" : "text-nowrap",
        className,
      ]
        .filter((string) => string)
        .join(" ")}
    >
      {children}
    </VStack>
  );
};

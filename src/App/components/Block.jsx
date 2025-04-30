import { VStack } from "./VStack";

export const Block = ({
  children = <div className="p-2">Flex item</div>,
  backgroundColor = "maroon",
  color = "bronze",
  className = "",
  shadow = "sm",
  rounded = 4,
  textWrap,
}) => {
  return (
    <VStack
      className={[
        `bg-${backgroundColor} text-${color} rounded-${rounded} shadow-${shadow} px-3 py-1`,
        textWrap ? "text-wrap" : "text-nowrap",
        className,
      ]
        .filter((string) => string)
        .join(" ")}
    >
      <div className="mb-auto"></div>
      {children}
      <div className="mt-auto"></div>
    </VStack>
  );
};

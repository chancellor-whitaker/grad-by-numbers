export const FlexColumn = ({
  defaultClassName = "d-flex flex-column",
  className = "",
  as = "div",
  gap = 3,
  ...rest
}) => {
  const As = as;

  return (
    <As
      className={[defaultClassName, `gap-${gap}`, className]
        .filter((string) => string)
        .join(" ")}
      {...rest}
    ></As>
  );
};

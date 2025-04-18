export const Block = ({
  defaultClassName = "flex-fill p-2 bg-light border border-dark rounded shadow text-center",
  className = "",
  as = "div",
  ...rest
}) => {
  const As = as;

  return (
    <As
      className={[defaultClassName, className]
        .filter((string) => string)
        .join(" ")}
      {...rest}
    ></As>
  );
};

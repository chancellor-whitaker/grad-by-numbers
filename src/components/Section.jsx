export const Section = ({
  className = "my-3 p-3 bg-body rounded shadow-sm",
  as = "div",
  children,
  ...rest
}) => {
  const As = as;

  const elements = [children]
    .filter((element) => element)
    .flat()
    .map((element, index) => <div key={index}>{element}</div>);

  return (
    <As className={className} {...rest}>
      {elements}
    </As>
  );
};

export const Container = ({ className = "", as = "main", ...rest }) => {
  const As = as;

  const entireClassName = ["container", className]
    .filter((string) => string)
    .join(" ");

  return <As className={entireClassName} {...rest}></As>;
};

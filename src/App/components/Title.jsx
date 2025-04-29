export const Title = ({
  textAlign = "center",
  fontWeight = "bold",
  className = "",
  fontSize = 5,
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

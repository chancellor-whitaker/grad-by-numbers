export const VStack = ({ className = "", width = 100, children, gap = 2 }) => {
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

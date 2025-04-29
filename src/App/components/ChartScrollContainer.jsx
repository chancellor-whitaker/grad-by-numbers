export const ChartScrollContainer = ({ children }) => {
  return (
    <div className="overflow-y-scroll" style={{ height: 300 }}>
      {children}
    </div>
  );
};

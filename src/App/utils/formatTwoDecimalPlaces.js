export const formatTwoDecimalPlaces = (number) =>
  number?.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

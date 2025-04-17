export function roundToTwo(num, x = 2) {
  return +(Math.round(num + `e+${x}`) + `e-${x}`);
}

export const makeSpacesNonBreaking = (value) =>
  value.toLocaleString().replace(/ /g, "\u00A0");

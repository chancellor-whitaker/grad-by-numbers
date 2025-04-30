export const defaultNameFormatter = ({ field, name }) => {
  if (field === "EKU_Service_Region") {
    if (name === "N") return "No";

    if (name === "Y") return "Yes";
  }

  if (field === "FirstGenInd") {
    if (name === "N") return "No";

    if (name === "Y") return "Yes";
  }

  if (field === "SHRDGMR_LEVL_CODE") {
    if (name === "GR") return "Graduate";

    if (name === "UG") return "Undergraduate";
  }

  if (field === "acat_desc") {
    const words = name.split(" ");

    if (words.find((word) => word === "Certificate")) {
      words[words.findIndex((word) => word === "Certificate")] = "Cert";
    }

    if (words.find((word) => word === "certificate")) {
      words[words.findIndex((word) => word === "certificate")] = "cert";
    }

    const wordStartsWithLetter = (word) =>
      "abcdefghijklmnopqrstuvwxyz"
        .split("")
        .some((letter) => word.toLowerCase().startsWith(letter));

    return words
      .filter(
        (word) =>
          word !== "degree" && word !== "Degree" && wordStartsWithLetter(word)
      )
      .join(" ");
  }

  return name;
};

import { levelValueFormatter } from "./levelValueFormatter";
import { yesNoValueFormatter } from "./yesNoValueFormatter";

export const columnDefs = [
  {
    valueFormatter: yesNoValueFormatter,
    headerName: "First Generation",
    field: "FirstGenInd",
  },
  {
    valueFormatter: yesNoValueFormatter,
    headerName: "Service Region",
    field: "EKU_Service_Region",
  },
  { headerName: "State", field: "STATENAME" },
  { field: "major_desc", headerName: "Major" },
  { headerName: "Award", field: "acat_desc" },
  {
    valueFormatter: levelValueFormatter,
    field: "SHRDGMR_LEVL_CODE",
    headerName: "Level",
  },
  { headerName: "KY County", field: "COUNTYNM" },
  { headerName: "Country", field: "country" },
  { headerName: "Age", field: "Age" },
  { field: "Overall_GPA_End_of_Term", headerName: "Graduation GPA" },
  { headerName: "Pell Recipient", field: "EKU_Low_Inc" },
];

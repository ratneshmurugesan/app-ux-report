import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const cols = [
  {
    field: "metric",
    headerName: "Metrics",
    width: "250",
  },
  {
    field: "percentile",
    headerName: "75th Percentile",
    width: "150",
  },
  {
    field: "goodDensity",
    headerName: "Good Density (%)",
    width: "150",
  },
  {
    field: "goodDensityStartEnd",
    headerName: "",
    width: "100",
  },
  {
    field: "needsImprovementDensity",
    headerName: "Need Improvement Density (%)",
    width: "250",
  },
  {
    field: "needsImprovementDensityStartEnd",
    headerName: "",
    width: "150",
  },
  {
    field: "poorDensity",
    headerName: "Poor Density (%)",
    width: "150",
  },
  {
    field: "poorDensityStartEnd",
    headerName: "",
    width: "100",
  },
];

export default function MetricsTable({ rows }) {
  return (
    <DataGrid
      disableColumnFilter
      rows={rows}
      columns={cols}
      getCellClassName={(params) => {
        if (
          params.field === "goodDensity" ||
          params.field === "goodDensityStartEnd"
        ) {
          return "green";
        }
        if (
          params.field === "needsImprovementDensity" ||
          params.field === "needsImprovementDensityStartEnd"
        ) {
          return "orange";
        }
        if (
          params.field === "poorDensity" ||
          params.field === "poorDensityStartEnd"
        ) {
          return "red";
        }
      }}
      pagination={false}
      disableRowSelectionOnClick
      disableColumnMenu
      hideFooter={true}
    />
  );
}

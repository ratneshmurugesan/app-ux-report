import React from "react";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useWebVitalsTable } from "./use-web-vitals-table";
// import VitalBox from "../vital-box";
import MultipleSelectCheckmarks from "../../components/select";
import { DataGrid } from "@mui/x-data-grid";
import SingleSelectCheckmarks from "../../components/single-select";

const metricOptions = [
  "interaction_to_next_paint",
  "largest_contentful_paint",
  "cumulative_layout_shift",
  "experimental_time_to_first_byte",
  "first_contentful_paint",
  "first_input_delay",
];
const thresholdOptions = [90, 80, 70, 60, 50, 40, 30, 20, 10, 0];

export default function WebVitalsTable({ searchData }) {
  const {
    cols,
    tableObj,
    tableSumObj,
    selectedMetric,
    selectedThreshold,
    handleMetricFilterChange,
    handleThresholdFilterChange,
  } = useWebVitalsTable({
    searchData,
  });

  const metricFilterProps = {
    filterName: selectedMetric,
    options: metricOptions,
    label: "Filter by metrics",
    handleChange: handleMetricFilterChange,
  };
  const thresholdFilterProps = {
    filterName: selectedThreshold,
    options: thresholdOptions,
    label: "Filter by above threshold density (%)",
    handleChange: handleThresholdFilterChange,
  };

  if (Object.keys(tableObj).length === 0)
    return <>Please add a URL and search to see data</>;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <MultipleSelectCheckmarks {...metricFilterProps} />
        <SingleSelectCheckmarks {...thresholdFilterProps} />
      </Box>

      <></>
      {Object.keys(tableObj).map((key, index) => {
        const sumOfGood = tableSumObj[key].reduce(
          (sum, obj) => sum + obj.goodDensity,
          0
        );
        const sumOfNeedImprovement = tableSumObj[key].reduce(
          (sum, obj) =>
            obj.needsImprovementDensity ? sum + obj.needsImprovementDensity : 0,
          0
        );
        const sumOfPoor = tableSumObj[key].reduce(
          (sum, obj) => sum + obj.poorDensity,
          0
        );
        const avgOfGood = Math.floor(
          tableSumObj[key].reduce((sum, obj) => sum + obj.goodDensity, 0) / 6
        );
        const avgOfNeedImprovement = Math.floor(
          tableSumObj[key].reduce(
            (sum, obj) =>
              obj.needsImprovementDensity
                ? sum + obj.needsImprovementDensity
                : 0,
            0
          ) / 6
        );
        const avgOfPoor = Math.floor(
          tableSumObj[key].reduce((sum, obj) => sum + obj.poorDensity, 0) / 6
        );
        console.log({ sumOfGood, sumOfNeedImprovement, sumOfPoor });
        const isFractionsDataAvailable =
          !!searchData?.[index]?.record?.metrics?.form_factors?.fractions;

        const fractionsData = isFractionsDataAvailable
          ? searchData?.[index]?.record?.metrics?.form_factors?.fractions
          : null;

        let fractionsRows = [];
        let fractionsCols = [];

        if (isFractionsDataAvailable) {
          fractionsRows = Object.keys(
            searchData?.[index].record.metrics.form_factors.fractions
          )
            .map((fractionKey, index) => {
              return {
                id: `fraction${index}`,
                device: fractionKey,
                "page loads": Math.floor(fractionsData[fractionKey] * 100),
              };
            })
            .filter((obj) => {
              if (!selectedThreshold) return true;
              return obj?.["page loads"]
                ? selectedThreshold < obj["page loads"]
                : true;
            });
          fractionsCols = Object.keys(fractionsRows[0])
            .filter((key) => key !== "id")
            .map((key) => {
              if (key === "page loads") {
                return {
                  field: key,
                  headerName: `${key.toLocaleUpperCase()} %`,
                  width: "150",
                };
              }
              return {
                field: key,
                headerName: key.toLocaleUpperCase(),
                width: "150",
              };
            });
        }

        return (
          <>
            <Box
              key={key}
              sx={{
                mb: 5,
                gap: 2,
              }}
            >
              <Box
                sx={{
                  m: "10px",
                  width: "100%",
                  fontWeight: "bold",
                }}
              >
                <Typography variant="h6" sx={{ my: 2 }}>
                  {key}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 2,
                  }}
                >
                  <Typography>Sum</Typography>
                  <Typography
                    sx={{
                      fontWeight: " bold",
                      color: "green",
                    }}
                  >
                    Good: {Math.floor(sumOfGood)}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: " bold",
                      color: "orange",
                    }}
                  >
                    NeedImprovement: {Math.floor(sumOfNeedImprovement)}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: " bold",
                      color: "red",
                    }}
                  >
                    Poor: {Math.floor(sumOfPoor)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 1,
                  }}
                >
                  <Typography>Avg.</Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: `${avgOfGood}% ${avgOfNeedImprovement}% ${avgOfPoor}%`,
                      gap: 1,
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "green",
                        height: "23px",
                        borderRadius: "5px",
                        width: "100%",
                        textAlign: "center",
                        fontSize: "15px",
                        color: "white",
                      }}
                    >{`${avgOfGood}%`}</Box>
                    <Box
                      sx={{
                        backgroundColor: "orange",
                        height: "23px",
                        borderRadius: "5px",
                        width: "100%",
                        textAlign: "center",
                        fontSize: "15px",
                      }}
                    >{`${avgOfNeedImprovement}%`}</Box>
                    <Box
                      sx={{
                        backgroundColor: "red",
                        color: "white",
                        height: "23px",
                        borderRadius: "5px",
                        width: "100%",
                        textAlign: "center",
                        fontSize: "15px",
                      }}
                    >{`${avgOfPoor}%`}</Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  mb: 5,
                  display: "grid",
                  gridTemplateColumns: "75% 25%",
                  gap: 2,
                  alignItems: "stretch",
                  "& .green": {
                    backgroundColor: "green",
                    color: "#fff",
                  },
                  "& .orange": {
                    backgroundColor: "orange",
                    color: "#000",
                  },
                  "& .red": {
                    backgroundColor: "red",
                    color: "##fff",
                  },
                }}
              >
                <DataGrid
                  disableColumnFilter
                  rows={tableObj[key]}
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
                <Box>
                  <Box sx={{ width: "100%" }}>
                    <DataGrid
                      disableColumnFilter
                      rows={fractionsRows}
                      columns={fractionsCols}
                      disableRowSelectionOnClick
                      disableColumnMenu
                      hideFooter={true}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        );
      })}
    </>
  );
}

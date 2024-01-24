import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export default function DeviceTable({
  tableObj,
  searchData,
  selectedThreshold,
}) {
  return (
    <>
      {Object.keys(tableObj).map((_, index) => {
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
        );
      })}
    </>
  );
}

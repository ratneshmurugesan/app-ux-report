import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function DeviceTable({ searchData }) {
  const isFractionsDataAvailable =
    !!searchData?.metrics?.form_factors?.fractions;

  const fractionsData = isFractionsDataAvailable
    ? searchData?.metrics?.form_factors?.fractions
    : null;

  let fractionsRows = [];
  let fractionsCols = [];

  if (isFractionsDataAvailable) {
    fractionsRows = Object.keys(searchData.metrics.form_factors.fractions).map(
      (fractionKey, index) => {
        return {
          id: `fraction${index}`,
          device: fractionKey,
          "page loads": `${fractionsData[fractionKey] * 100} %`,
        };
      }
    );
    fractionsCols = Object.keys(fractionsRows[0])
      .filter((key) => key !== "id")
      .map((key) => {
        return {
          field: key,
          headerName: key.toLocaleUpperCase(),
          width: "200",
        };
      });
  }
  console.log({ fractionsRows, fractionsCols });

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        disableColumnFilter
        rows={fractionsRows}
        columns={fractionsCols}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
      />
    </Box>
  );
}

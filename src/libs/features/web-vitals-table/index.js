import React from "react";

import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useWebVitalsTable } from "./use-web-vitals-table";
import VitalBox from "../vital-box";

export default function WebVitalsTable({ searchQuery }) {
  const { searchData, selectedDevice, deviceOptions, handleChange } =
    useWebVitalsTable(searchQuery);

  if (!searchQuery) return <>Add a URL and search to see data</>;

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Box>Filter</Box>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Device</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedDevice}
            onChange={handleChange}
            label="Device"
          >
            {deviceOptions.map((deviceOption) => {
              return (
                <MenuItem key={deviceOption.id} value={deviceOption.value}>
                  {deviceOption.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      {!searchData ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No data for this option
        </Box>
      ) : (
        <VitalBox searchData={searchData} />
      )}
    </Stack>
  );
}

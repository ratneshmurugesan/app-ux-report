import React, { useEffect, useRef, useState } from "react";

import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import { cruxAPI } from "../../infra/api";
// import { DataGrid } from "@mui/x-data-grid";

export default function WebVitalsTable({ searchQuery }) {
  const inputRef = useRef(null);
  const [searchData, setSearchData] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState("ALL");

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const fetchData = async (body) => {
    try {
      const data = await cruxAPI.create(body);
      setSearchData(data.data.record);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChange = (event) => {
    const selectedDevice = event.target.value;
    let body = {
      origin: searchQuery,
      formFactor: selectedDevice,
    };
    if (selectedDevice === "ALL") {
      body = {
        origin: searchQuery,
      };
    }
    fetchData(body);
    setSelectedDevice(selectedDevice);
  };
  console.log({ searchQuery, searchData, selectedDevice });

  const deviceOptions = [
    { id: "all", name: "All", value: "ALL" },
    { id: "phone", name: "Phone", value: "PHONE" },
    { id: "tablet", name: "Tablet", value: "TABLET" },
    { id: "desktop", name: "Desktop", value: "DESKTOP" },
  ];

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
      <Box sx={{ height: "100vh" }}>
        <Box sx={{ height: 400, width: "100%" }}>
          {/* <DataGrid
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
          /> */}
        </Box>
      </Box>
    </Stack>
  );
}

import React from "react";
import Box from "@mui/material/Box";
import WebVitalsTable from "../web-vitals-table";

export default function MainLayout({ searchData, handleDeviceChange }) {
  const tableProps = { searchData, handleDeviceChange };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
      <WebVitalsTable {...tableProps} />
    </Box>
  );
}

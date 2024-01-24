import React from "react";
import Box from "@mui/material/Box";
import WebVitalsTable from "../web-vitals";

export default function MainLayout({ searchData, handleDeviceChange }) {
  const tableProps = { searchData, handleDeviceChange };
  return (
    <Box sx={{ width: "100%" }}>
      <WebVitalsTable {...tableProps} />
    </Box>
  );
}

import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DeviceTable from "../device-table";
import WebVitalsTable from "../web-vitals-table";
import { CustomTabPanel } from "../../components/tab-panel";

const tabOptions = [
  { id: "web_vitals", name: "Core Web Vitals" },
  { id: "fractions_by_devices", name: " Fractions by Devices" },
];

const tabPageMap = {
  web_vitals: WebVitalsTable,
  fractions_by_devices: DeviceTable,
};

export default function MainLayout({ searchData, searchQuery }) {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  const tableProps = { searchData, searchQuery };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabOptions.map((tabOption) => {
            return <Tab label={tabOption.name} />;
          })}
        </Tabs>
      </Box>
      {tabOptions.map((tabOption, index) => {
        const Comp = tabPageMap[tabOption.id];
        return (
          <CustomTabPanel value={selectedTab} index={index}>
            <Comp {...tableProps} />
          </CustomTabPanel>
        );
      })}
    </Box>
  );
}

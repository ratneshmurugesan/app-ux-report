import { useState } from "react";

import { cruxAPI } from "../../infra/api";
import {
  useSnackBarDispatch,
  useSnackBarStore,
} from "../../contexts/snack-bar-context";
import { LOAD_SNACK_BAR } from "../../contexts/snack-bar-context/action-types";

const deviceOptions = [
  { id: "all", name: "All", value: "ALL" },
  { id: "phone", name: "Phone", value: "PHONE" },
  { id: "tablet", name: "Tablet", value: "TABLET" },
  { id: "desktop", name: "Desktop", value: "DESKTOP" },
];

export const useWebVitalsTable = (searchQuery) => {
  const [searchData, setSearchData] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState("ALL");

  const dispatch = useSnackBarDispatch();

  const fetchData = async (body) => {
    await cruxAPI
      .create(body)
      .then((data) => {
        setSearchData(data.data.record);
      })
      .catch((err) => {
        dispatch({ type: LOAD_SNACK_BAR, open: true, content: err.message });
        setSearchData(null);
      });
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

  return {
    searchData,
    selectedDevice,
    deviceOptions,
    handleChange,
  };
};

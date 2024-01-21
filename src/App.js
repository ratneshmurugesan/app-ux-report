import { useRef, useEffect, useState } from "react";

import "./App.css";
import { cruxAPI } from "./libs/infra/api";

import {
  Stack,
  OutlinedInput,
  InputAdornment,
  Button,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import MainLayout from "./libs/features/main-layout";
import { VALID_URL_PATTERN } from "./libs/constants";
import { useSnackBarDispatch } from "./libs/contexts/snack-bar-context";
import SnackBar from "./libs/components/snack-bar";
import { LOAD_SNACK_BAR } from "./libs/contexts/snack-bar-context/action-types";

// const tabOptions = [
//   { id: "single_link", name: "Single Link" },
//   { id: "multiple_links", name: "Multiple Links" },
// ];

// const tabPageMap = {
//   web_vitals: WebVitalsTable,
//   fractions_by_devices: DeviceTable,
// };

function App() {
  const inputRef = useRef(null);
  const searchQueryRef = useRef("");
  const [searchData, setSearchData] = useState(null);
  const dispatch = useSnackBarDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleSearchClick = () => {
    const body = {
      origin: searchQueryRef.current,
      // metrics: ["largest_contentful_paint", "experimental_time_to_first_byte"],
      // effectiveConnectionType: ["offline", "slow-2G", "2G", "3G", "4G"],
    };
    fetchData(body);
  };

  // const [count, setCount] = useState(1);

  // const handleAddMoreClick = () => {
  //   setCount(count + 1);
  // };

  const fetchData = async (body) => {
    try {
      const data = await cruxAPI.create(body);
      setSearchData(data.data.record);
      dispatch({ type: LOAD_SNACK_BAR, open: true, content: "Data loaded" });
    } catch (err) {
      dispatch({ type: LOAD_SNACK_BAR, open: true, content: err.message });
    }
  };

  const mainLayoutProps = { searchData, searchQuery: searchQueryRef.current };
  return (
    <>
      <Container sx={{ padding: "10px" }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <OutlinedInput
                inputRef={inputRef}
                onChange={(e) => {
                  const enteredText = e.target.value;
                  const isUrlValid = VALID_URL_PATTERN.test(enteredText);
                  if (isUrlValid) {
                    searchQueryRef.current = enteredText;
                  }
                }}
                type="url"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#000" }} />
                  </InputAdornment>
                }
                placeholder="https://example.com"
              />
            </FormControl>
            {/* <Button
              variant="contained"
              size="small"
              // onClick={handleSearchClick}
            >
              + Add more
            </Button> */}
            <Button
              variant="contained"
              size="small"
              onClick={handleSearchClick}
            >
              Search
            </Button>
          </Stack>
          <MainLayout {...mainLayoutProps} />
        </Stack>
      </Container>
      <SnackBar />
    </>
  );
}

export default App;

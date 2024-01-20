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
import { VALID_URL_PATTERN } from "./libs/components/form/constants";

function App() {
  const inputRef = useRef(null);
  const searchQueryRef = useRef("");
  const [searchData, setSearchData] = useState(null);

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

  const fetchData = async (body) => {
    try {
      const data = await cruxAPI.create(body);
      console.log({ record: data.data.record });
      setSearchData(data.data.record);
    } catch (err) {
      alert(err.message);
    }
  };

  console.log({ searchQuery: searchQueryRef.current, searchData });

  const mainLayoutProps = { searchData, searchQuery: searchQueryRef.current };
  return (
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
          <Button variant="contained" size="small" onClick={handleSearchClick}>
            Search
          </Button>
        </Stack>
        <MainLayout {...mainLayoutProps} />
      </Stack>
    </Container>
  );
}

export default App;

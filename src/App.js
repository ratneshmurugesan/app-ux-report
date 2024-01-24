import { useRef, useEffect, useState } from "react";

import "./App.css";
import { cruxAPI } from "./libs/infra/api";

import {
  Stack,
  OutlinedInput,
  InputAdornment,
  Button,
  FormControl,
  IconButton,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import MainLayout from "./libs/features/main-layout";
import { useSnackBarDispatch } from "./libs/contexts/snack-bar-context";
import SnackBar from "./libs/components/snack-bar";
import { LOAD_SNACK_BAR } from "./libs/contexts/snack-bar-context/action-types";
import { CloseOutlined } from "@mui/icons-material";

function App() {
  const inputRef = useRef(null);

  const [searchData, setSearchData] = useState(null);
  const dispatch = useSnackBarDispatch();

  const [fields, setFields] = useState([""]);

  const handleAddField = () => {
    setFields([...fields, ""]);
  };

  const handleRemoveField = (index) => {
    const filteredFields = fields.filter((_, i) => i !== index);
    setFields(filteredFields);
    setSearchData(searchData.filter((_, ind) => ind !== index));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleSearchClick = () => {
    fetchData();
  };

  const fetchData = async () => {
    const multipleBodies = fields.map((url) => {
      return {
        origin: url,
      };
    });
    try {
      const data = await cruxAPI.bulkCreate(multipleBodies);
      const formatted = data.map((obj) => ({
        record: obj.value.data.record,
      }));
      setSearchData(formatted);
      dispatch({ type: LOAD_SNACK_BAR, open: true, content: "Data loaded" });
    } catch (err) {
      dispatch({
        type: LOAD_SNACK_BAR,
        open: true,
        content: "Please check the URL",
      });
    }
  };

  const mainLayoutProps = { searchData };

  return (
    <>
      <Container sx={{ padding: "10px" }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "center",
            }}
          >
            <Container maxWidth="md" sx={{ mt: 8 }}>
              {fields.map((field, index) => (
                <FormControl
                  key={index}
                  variant="outlined"
                  sx={{ display: "flex", gap: 5 }}
                >
                  <OutlinedInput
                    value={field}
                    onChange={(e) => {
                      const updatedFields = [...fields];
                      updatedFields[index] = e.target.value.trim();
                      setFields(updatedFields);
                    }}
                    type="url"
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#000" }} />
                      </InputAdornment>
                    }
                    endAdornment={
                      <IconButton onClick={() => handleRemoveField(index)}>
                        <CloseOutlined />
                      </IconButton>
                    }
                    placeholder="https://example.com"
                    sx={{ flex: 1 }}
                  />
                </FormControl>
              ))}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 5,
                  py: 2,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleAddField}
                >
                  + Add input
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSearchClick}
                >
                  Search
                </Button>
              </Box>
            </Container>
          </Stack>
          <MainLayout {...mainLayoutProps} />
        </Stack>
      </Container>
      <SnackBar />
    </>
  );
}

export default App;

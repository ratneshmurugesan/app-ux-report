import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";

export default function SingleSelectCheckmarks({
  label = "Filter by",
  options,
  filterName,
  handleChange,
}) {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} variant="standard">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterName}
          label={label}
          onChange={handleChange}
        >
          {options.map((name) => (
            <MenuItem key={name} value={name}>
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

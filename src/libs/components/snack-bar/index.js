import { Box, Snackbar } from "@mui/material";
import React from "react";
import {
  useSnackBarDispatch,
  useSnackBarStore,
} from "../../contexts/snack-bar-context";
import { LOAD_SNACK_BAR } from "../../contexts/snack-bar-context/action-types";

export default function SnackBar() {
  const { open, content } = useSnackBarStore();
  const dispatch = useSnackBarDispatch();

  const handleClose = () => {
    dispatch({ type: LOAD_SNACK_BAR, open: false, content: "" });
  };

  return (
    <Box sx={{ width: "auto" }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        message={content}
        autoHideDuration={3000}
      />
    </Box>
  );
}

import React from "react";
import { SnackBarStoreProvider } from "../contexts/snack-bar-context";

export default function Providers({ children }) {
  return <SnackBarStoreProvider>{children}</SnackBarStoreProvider>;
}

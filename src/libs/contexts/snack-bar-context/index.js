import { createContext, useContext, useReducer } from "react";
import { snackBarReducer } from "./reducer";

const storeContext = createContext({});
const dispatchContext = createContext({});

export const initialSnackBarState = {
  open: false,
  content: "-",
};

export const SnackBarStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(snackBarReducer, initialSnackBarState);

  return (
    <dispatchContext.Provider value={dispatch}>
      <storeContext.Provider value={state}>{children}</storeContext.Provider>
    </dispatchContext.Provider>
  );
};

export const useSnackBarStore = () => {
  return useContext(storeContext);
};

export const useSnackBarDispatch = () => {
  return useContext(dispatchContext);
};

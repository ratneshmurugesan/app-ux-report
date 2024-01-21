import { LOAD_SNACK_BAR } from "./action-types";

export function snackBarReducer(state, action) {
  switch (action.type) {
    case LOAD_SNACK_BAR:
      return { ...state, open: action.open, content: action.content };
    default: {
      return state;
    }
  }
}

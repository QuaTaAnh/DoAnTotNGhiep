import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SnackbarState {
  open: boolean;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  type: "success",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        type: SnackbarState["type"];
      }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export const selectSnackbar = (state: { snackbar: SnackbarState }) =>
  state.snackbar;

export default snackbarSlice.reducer;

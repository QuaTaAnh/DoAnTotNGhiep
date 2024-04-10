import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "./type";

const initialAuthState: IAuthState = localStorage.getItem("access_token")
  ? {
      user: null,
      access_token: localStorage.getItem("access_token") || "",
    }
  : {
      user: null,
      access_token: "",
    };

const userSlice = createSlice({
  name: "user",
  initialState: initialAuthState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string | any>) => {
      state.access_token = action.payload.access_token;
      localStorage.setItem("access_token", action.payload.access_token);
    },
    profileSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    loginEnd: (state) => {
      state.access_token = "";
    },
  },
});

export const { loginSuccess, loginEnd, profileSuccess } = userSlice.actions;
export default userSlice.reducer;

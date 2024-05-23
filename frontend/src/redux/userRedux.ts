import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "./type";
import { IUser } from "../type";

const initialAuthState: IAuthState = localStorage.getItem("access_token")
  ? {
      user: null,
      access_token: localStorage.getItem("access_token") || "",
      allUsers: [],
      totalPages: 0,
      locationUser: null
    }
  : {
      user: null,
      access_token: "",
      allUsers: [],
      totalPages: 0,
      locationUser: null
    };

const userSlice = createSlice({
  name: "user",
  initialState: initialAuthState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string | any>) => {
      state.access_token = action.payload.token;
      localStorage.setItem("access_token", action.payload.token);
    },
    profileSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
    },
    loginEnd: (state) => {
      state.access_token = "";
      localStorage.clear();
    },
    allUserSuccess: (state, action: PayloadAction<IUser[]>) => {
      state.allUsers = action.payload;
    },
    totalPageSuccess: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    locationUserSuccess: (state, action: PayloadAction<any>) => {
      state.locationUser = action.payload
    },
  },
});

export const {
  loginSuccess,
  loginEnd,
  profileSuccess,
  allUserSuccess,
  totalPageSuccess,
  locationUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;

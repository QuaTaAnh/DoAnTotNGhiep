import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../utils/request";
import { startLoading, stopLoading } from "./loadingRedux";
import { profileSuccess } from "./userRedux";

export const getProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { dispatch }) => {
    try {
      dispatch(startLoading());
      const res = await request.get(`api/v1/auth/profile`);
      dispatch(profileSuccess(res.data));
      return res.data;
    } catch (error) {
      console.error("Error");
      throw error;
    } finally {
      dispatch(stopLoading());
    }
  }
);

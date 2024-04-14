import { Dispatch } from "@reduxjs/toolkit";
import { IUser } from "../type";
import { startLoading, stopLoading } from "../redux/loadingRedux";
import request from "./request";
import { loginEnd, loginSuccess } from "../redux/userRedux";

export const register = async (dispatch: Dispatch<any>, user: IUser) => {
  dispatch(startLoading());
  try {
    return await request.post("api/v1/auth/register", user);
  } catch (error) {
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const login = async (dispatch: Dispatch<any>, user: IUser) => {
  dispatch(startLoading());
  try {
    const res = await request.post("api/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    return res;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    dispatch(stopLoading());
  }
};

export const logout = (dispatch: Dispatch<any>) => {
  dispatch(loginEnd());
};

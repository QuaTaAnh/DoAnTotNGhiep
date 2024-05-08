import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../utils/request";
import { startLoading, stopLoading } from "./loadingRedux";
import { profileSuccess } from "./userRedux";
import {
  acreageSuccess,
  categorySuccess,
  postSuccess,
  priceSuccess,
} from "./apiRedux";
import { ICommentState, IParamPost } from "./type";
import { commentSuccess } from "./commentRedux";

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

export const getCategory = createAsyncThunk(
  "category/fetchCategory",
  async (_, { dispatch }) => {
    try {
      dispatch(startLoading());
      const res = await request.get(`api/v1/category/get-all`);
      dispatch(categorySuccess(res.data));
      return res.data;
    } catch (error) {
      console.error("Error");
      throw error;
    } finally {
      dispatch(stopLoading());
    }
  }
);

export const getPrice = createAsyncThunk(
  "price/fetchPrice",
  async (_, { dispatch }) => {
    try {
      dispatch(startLoading());
      const res = await request.get(`api/v1/price/get-all`);
      dispatch(priceSuccess(res.data));
      return res.data;
    } catch (error) {
      console.error("Error");
      throw error;
    } finally {
      dispatch(stopLoading());
    }
  }
);

export const getAcreage = createAsyncThunk(
  "acreage/fetchAcreage",
  async (_, { dispatch }) => {
    try {
      dispatch(startLoading());
      const res = await request.get(`api/v1/acreage/get-all`);
      dispatch(acreageSuccess(res.data));
      return res.data;
    } catch (error) {
      console.error("Error");
      throw error;
    } finally {
      dispatch(stopLoading());
    }
  }
);

export const getPostByPage = createAsyncThunk(
  "post/fetchPost",
  async (dataParams: IParamPost, { dispatch }) => {
    dispatch(startLoading());
    try {
      const { page, priceId, areaId, categoryId } = dataParams;
      console.log(dataParams);

      const { data } = await request.get("api/v1/post/get-all", {
        params: {
          page: page,
          priceId: priceId,
          areaId: areaId,
          categoryId: categoryId,
        },
      });
      if (data?.status) {
        dispatch(postSuccess(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  }
);

export const getCommentByPage = createAsyncThunk(
  "comment/fetchAllComment",
  async (props: ICommentState, { dispatch }) => {
    dispatch(startLoading());
    try {
      const { page, postId } = props;
      const { data } = await request.get("/api/v1/comment/get-all", {
        params: {
          page: page,
          postId: postId,
        },
      });
      dispatch(commentSuccess(data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  }
);

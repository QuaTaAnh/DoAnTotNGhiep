import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../type";

const initialState = {
  posts: [],
  totalPages: 0,
  page: 1,
  categories: [],
  prices: [],
  acreages: [],
};

const apiSlice = createSlice({
  name: "apiRedux",
  initialState: initialState,
  reducers: {
    postSuccess: (state, action: PayloadAction<ICategory[] | any>) => {
      state.posts = action.payload.posts;
      state.totalPages = action.payload.totalPages;
    },
    pageSuccess: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    categorySuccess: (state, action: PayloadAction<ICategory[] | any>) => {
      state.categories = action.payload.categories;
    },
    priceSuccess: (state, action: PayloadAction<ICategory[] | any>) => {
      state.prices = action.payload.prices;
    },
    acreageSuccess: (state, action: PayloadAction<ICategory[] | any>) => {
      state.acreages = action.payload.acreages;
    },
  },
});

export const {
  postSuccess,
  categorySuccess,
  priceSuccess,
  acreageSuccess,
  pageSuccess,
} = apiSlice.actions;
export default apiSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../type";

const initialState = {
  categories: null,
  prices: null,
  acreages: null,
};

const apiSlice = createSlice({
  name: "apiRedux",
  initialState: initialState,
  reducers: {
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

export const { categorySuccess, priceSuccess, acreageSuccess } =
  apiSlice.actions;
export default apiSlice.reducer;

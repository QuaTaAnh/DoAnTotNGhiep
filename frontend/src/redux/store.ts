import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loadingRedux from "./loadingRedux";
import snackbarRedux from "./snackbarRedux";
import userRedux from "./userRedux";
import apiRedux from "./apiRedux";

const rootReducer = combineReducers({
  snackbar: snackbarRedux,
  loading: loadingRedux,
  user: userRedux,
  api: apiRedux,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

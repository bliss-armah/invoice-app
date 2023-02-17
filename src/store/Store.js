import { configureStore } from "@reduxjs/toolkit";
import InvoiceReducer from "../invoiceSlice/InvoiceSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  invoice: InvoiceReducer,
});

const perstistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: perstistedReducer,
});

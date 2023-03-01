import { configureStore } from "@reduxjs/toolkit";
import InvoiceReducer from "../invoiceSlice/InvoiceSlice";



// const perstistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer:{
    invoice: InvoiceReducer,
  }
});

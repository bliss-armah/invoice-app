import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


  const url = 'https://invoice-api-9l7b.onrender.com/invoice'

const initialState = { 
    invoiceData: localStorage.getItem("invoiceData") ? JSON.parse(localStorage.getItem("invoiceData")) : [],
    isLoading: true,
    isDarkMode: false

 };

 export const getInvoiceItems = createAsyncThunk(
  'invoice/getInvoiceItems',
  async () => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return error.message
    }
  }
);

 
 const InvoiceSlice = createSlice({
     name: 'invoice',
     initialState,
     reducers: {
     },
     extraReducers: (builder)=> {
      builder.addCase(getInvoiceItems.pending,(state) => {
        state.isLoading = true;
      },).addCase(getInvoiceItems.fulfilled,(state, action) => {
        state.isLoading = false;
        state.invoiceData = action.payload;
      },).addCase(getInvoiceItems.rejected,(state, action) => {
        console.log(action);
        state.isLoading = false;
      },)
      
    },

   

})

export const {addInvoice,updateInvoice, isLoading,invoiceData} = InvoiceSlice.actions
export default InvoiceSlice.reducer

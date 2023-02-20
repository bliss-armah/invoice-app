import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://invoice-api-9l7b.onrender.com/invoice";


const initialState = {
  invoiceData: [],
  isLoading: true,
  isDarkMode: false,
};

// export const deleteItem = (id) => async (dispatch) => {
//   try {
//     await axios.delete(`https://invoice-api-9l7b.onrender.com/invoice/${id}`, {
//     });
//     dispatch({ type: "DELETE_ITEM", payload: id });
//   } catch (error) {
//     console.error(error.message)
//     console.error(error);
//   }
// };




export const getInvoiceItems = createAsyncThunk(
  "invoice/getInvoiceItems",
  async () => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return error.message;
    }
  }
  );
  
  const InvoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
      addToInvoice: (state, action) => {
        state.invoiceData = action.payload;
        console.log(invoiceData);
      },
      
      toggleDarkMode: (state) => {
        state.isDarkMode = !state.isDarkMode;
      },
      
      deleteInvoice: (state, action) => {
     
      //   async() => {
      //     try {
      //       await axios.delete(`https://invoice-api-9l7b.onrender.com/invoice/${id}`)
      //       console.log(id)
      // } catch (error) {
      //   console.log(error);
      // }
      //   }
      state.invoiceData = state.invoiceData.filter((item) => item.id !== action.payload )
    }
  },
  
  extraReducers: (builder) => {
    builder
    .addCase(getInvoiceItems.pending, (state) => {
      state.isLoading = true;
      })
      .addCase(getInvoiceItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invoiceData = action.payload;
      })
      .addCase(getInvoiceItems.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {
  addInvoice,
  updateInvoice,
  isLoading,
  isDarkMode,
  invoiceData,
  addToInvoice,
  toggleDarkMode,
  deleteInvoice,
} = InvoiceSlice.actions;
export default InvoiceSlice.reducer;

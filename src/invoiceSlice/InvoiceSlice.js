import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const url = 'https://invoice.rantsnconfess.com/api/v1/invoice'
const url = "https://invoice.takoraditraining.com/api/v1/invoice";

const initialState = {
  invoiceData: [],
  isLoading: true,
  addDraft: true,
  isDarkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
};

export const deleteItem = createAsyncThunk(
  "invoice/deleteItem",
  async (itemId) => {
    const response = await axios.delete(`${url}/${itemId}`);
    return response.data.data;
  }
);

//  export const getInvoiceItems = createAsyncThunk(
//   'invoice/getInvoiceItems',
//   async () => {
//     try {
//       const resp = await axios(url);
//       console.log(resp);
//       return resp.data.data;
//     } catch (error) {
//       return error.message
//     }
//   }
// );

export const getInvoiceItems = createAsyncThunk(
  "invoice/getInvoiceItems",
  async () => {
    try {
      const resp = await axios(url);
      console.log(resp);
      return resp.data.data;
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
    },

    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.isDarkMode));
    },

    deleteInvoice: (state, action) => {
      state.invoiceData = state.invoiceData.filter(
        (item) => item.id !== action.payload
      );
    },
    toggleDraft: (state) => {
      state.addDraft = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getInvoiceItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvoiceItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invoiceData = action.payload;
        state.addDraft = false;
      })
      .addCase(getInvoiceItems.rejected, (state, action) => {
        console.log(action);
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
  toggleDraft,
} = InvoiceSlice.actions;
export default InvoiceSlice.reducer;

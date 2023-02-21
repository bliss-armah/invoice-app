import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


  const url = 'https://invoice-api-9l7b.onrender.com/invoice'


  
  const initialState = { 
    invoiceData: [],
    isLoading: true,
    isDarkMode: false
  };

  export const deleteItem = createAsyncThunk(
    'invoice/deleteItem',
    async (itemId) => {
      const response = await axios.delete(`https://invoice-api-9l7b.onrender.com/invoice/${itemId}`)
      return response.data
    }
  )

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
      addToInvoice:(state,action) =>{
        state.invoiceData = action.payload
      },

      toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode
        },

        deleteInvoice: (state, action ) => {
          const updatedItems = state.invoiceData.filter(item => item.id !== action.payload.id)
          state.invoiceData = updatedItems
        }
      
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

export const {addInvoice, updateInvoice, isLoading, isDarkMode, invoiceData, addToInvoice, toggleDarkMode, deleteInvoice} = InvoiceSlice.actions
export default InvoiceSlice.reducer

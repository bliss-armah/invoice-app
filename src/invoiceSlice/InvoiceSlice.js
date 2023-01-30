import { createSlice } from "@reduxjs/toolkit"


 const randomIdGenerator = () => {
    let randomPassword;
    const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomTwoLetter =
      letter[Math.trunc(Math.random() * 26)] +
      letter[Math.trunc(Math.random() * 26)];
    return (
      randomPassword = randomTwoLetter + Math.trunc(Math.random() * 9999 + 1)
      );
  };
  

const initialState = { 
    invoiceData: localStorage.getItem("invoiceData") ? JSON.parse(localStorage.getItem("invoiceData")) : []
 };

 
 const InvoiceSlice = createSlice({
     name: 'invoice',
     initialState,
     reducers: {
     }
})

export const {addInvoice,updateInvoice} = InvoiceSlice.actions
export default InvoiceSlice.reducer

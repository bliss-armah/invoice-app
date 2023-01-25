import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    invoiceItems : [],
    
}

const InvoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        updateInvoice:(state,action) =>{
            state.invoiceItems  = action.payload
        }
    }
})

export const {updateInvoice} = InvoiceSlice.actions
export default InvoiceSlice.reducer


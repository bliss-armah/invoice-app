
import { configureStore } from '@reduxjs/toolkit'
import InvoiceReducer from '../invoiceSlice/InvoiceSlice'

export const store = configureStore({
    reducer: {
        invoice: InvoiceReducer
    }
})
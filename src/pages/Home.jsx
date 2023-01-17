import React from 'react'
import InvoiceNav from '../components/Home/InvoiceNav/InvoiceNav'
import Card from '../components/Home/Card/Card'
import InvoiceData from "../data.json"

const Home = () => {
  return (
    <>
      <div className='p-6 space-y-6 mt-20 z-50'>
        <InvoiceNav />
        {
          InvoiceData.map((invoice, key) => {
            return <Card key={key} 
                      invoiceId={invoice.id} 
                      name={invoice.clientName}
                      dueDate={invoice.paymentDue}
                      amount={invoice.total}
                      status={invoice.status}
                    />
          })
        }
      </div>
    </>
  )
}

export default Home
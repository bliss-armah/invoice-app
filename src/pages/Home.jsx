import React from 'react'
import InvoiceNav from '../components/Home/InvoiceNav/InvoiceNav'
import Card from '../components/Home/Card/Card'
import InvoiceData from "../data.json"

const Home = () => {
  return (
    <>
      <div className='p-6 pt-28 md:px-9 space-y-3 font-spartan overflow-y-scroll
        lg:w-full lg:px-36 xl:px-60'>
        <InvoiceNav />

        <div className='space-y-5'>
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
      </div>
    </>
  )
}

export default Home
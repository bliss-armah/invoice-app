import React from 'react'
import Nav from '../components/Home/Nav/Nav'
import InvoiceNav from '../components/Home/InvoiceNav/InvoiceNav'
import Card from '../components/Home/Card/Card'
import NoContent from '../components/Home/Card/NoContent'
import InvoiceData from "../data.json"

const Home = () => {
//   const invoice = InvoiceData.map(n => {
//     return {value:n}
//   })
//   console.log(invoice);
  return (
    <>
      <Nav />

    <div className='p-6 space-y-6'>
      <InvoiceNav />

      {InvoiceData.length == 0 ? <NoContent /> : ""}

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
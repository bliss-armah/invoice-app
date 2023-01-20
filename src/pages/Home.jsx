import React from 'react'
import InvoiceNav from '../components/Home/InvoiceNav/InvoiceNav'
import NoContent from '../components/Home/Card/NoContent'
import Card from '../components/Home/Card/Card'
import InvoiceData from '../data.json'

const Home = ({darkMode}) => {
  return (
    <>
      <div className='p-6 pt-28 md:px-9 space-y-3 font-spartan lg:w-full border-5 md:h-[90%] lg:h-[95%] 
        overflow-y-scroll lg:px-36 xl:px-60 2xl:px-[20%] min-[2560px]:px-[30%]'>
        <InvoiceNav />

        <div className='space-y-5'>
           { InvoiceData.length 
              ? InvoiceData.map((invoice, key) => {
                  return <Card darkMode={darkMode} key={key} 
                            invoiceId={invoice.id} 
                            name={invoice.clientName}
                            dueDate={invoice.paymentDue}
                            amount={invoice.total}
                            status={invoice.status}
                          /> 
                }) 
            : <NoContent />
          }
        </div>
      </div>
    </>
  )
}

export default Home
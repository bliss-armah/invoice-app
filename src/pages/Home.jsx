import React from 'react'
import InvoiceNav from '../components/Home/InvoiceNav/InvoiceNav'
import NoContent from '../components/Home/Card/NoContent'
import Card from '../components/Home/Card/Card'
import { useState, useEffect } from 'react'
import axios from 'axios'


const Home = ({darkMode}) => {
  console.log(darkMode);
  return (
    <>
      <div className='p-6 pt-28 md:px-9 space-y-3 font-spartan lg:w-full h-screen  
        lg:px-36 xl:px-60 2xl:px-[20%] min-[2560px]:px-[30%] overflow-auto'>
        <InvoiceNav invoice={invoice} darkMode={darkMode} checkStatus={checkStatus}/>

        <div className='space-y-5'>
          {
            InvoiceData.map((invoice, key) => {
              return <Card darkMode={darkMode} key={key} 
                        invoiceId={invoice.id} 
                        name={invoice.clientName}
                        dueDate={invoice.paymentDue}
                        amount={invoice.total}
                        status={invoice.status}
                      /> 
            })
          }
        </div>
        {/* <CreateInvoice darkMode={darkMode} /> */}
      </div>
    </>
  )
}

export default Home
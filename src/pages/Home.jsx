import React from "react";
import InvoiceNav from "../components/Home/InvoiceNav/InvoiceNav";
import NoContent from "../components/Home/Card/NoContent";
import Card from "../components/Home/Card/Card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Home/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceItems, toggleDraft } from "../invoiceSlice/InvoiceSlice";
import {format} from 'date-fns'

const Home = ({ darkMode }) => {
  const { invoiceData, isLoading, addDraft } = useSelector(
    (store) => store.invoice
  );
  const [invoice, setInvoice] = useState({});
  const [invoicefilter, setInvoiceFilter] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (addDraft) {
      dispatch(getInvoiceItems());
    }
  }, [invoiceData]);

  const checkStatus = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setInvoiceFilter([...invoicefilter, value]);
    } else {
      setInvoiceFilter(invoicefilter.filter((cb) => cb !== value));
    }
  };

  // const sortedItems = [...invoiceData].sort((a, b) => a - b);
  const sortedItems = [...invoiceData].sort((a) => a - 1)

  // console.log(sortedItems);

  return (
    <>
      <div
        className="p-6 pt-28 md:px-9 space-y-3 font-spartan h-screen  
        lg:pt-14 lg:pr-0 lg:pl-14 lg:w-[700px] lg:m-auto xl:pt-12 xl:w-[1000px] 
        xl:m-auto overflow-auto scroll-hide"
      >
        <InvoiceNav
          invoice={invoice}
          darkMode={darkMode}
          checkStatus={checkStatus}
        />

        <div className="space-y-5">
          {isLoading ? (
            <Loader />
          ) : sortedItems.length ? (
            invoicefilter.length ? (
              sortedItems
                .filter((result) => invoicefilter.includes(result.status))
                .map((invoice, key) => {
                  return (
                    <div key={key}>
                      <Link to={`/viewinvoice/${invoice.id}`}>
                        <Card
                          darkMode={darkMode}
                          invoiceId={invoice.id}
                          name={invoice.clientName}
                          dueDate={format(new Date(invoice.paymentDue), 'd MMM yyy')}
                          // dueDate={invoice.paymentDue}
                          amount={invoice.total}
                          status={invoice.status}
                        />
                      </Link>
                    </div>
                  );
                })
            ) : (
              sortedItems.map((invoice, key) => {
                return (
                  <div key={key}>
                    <Link to={`/viewinvoice/${invoice.id}`}>
                      <Card
                        darkMode={darkMode}
                        invoiceId={invoice.id}
                        name={invoice.clientName}
                        dueDate={format(new Date(invoice.paymentDue), 'd MMM yyy') || format(new Date(), 'd MMM yyy')}
                        // dueDate={invoice.paymentDue}
                        amount={invoice.total}
                        status={invoice.status}
                      />
                    </Link>
                  </div>
                );
              })
            )
          ) : (
            <NoContent />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

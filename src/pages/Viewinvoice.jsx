import React, { useState, useEffect, useCallback } from "react";
import "./Viewinvoice.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Edit from "../components/editInvoiceForm/Edit";
import ConfirmDelete from "../components/confirmDelete/ConfirmDelete";

function Viewinvoice({ darkMode }) {
  const navigate = useNavigate();
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [datas, setDatas] = useState({});
  const [mark, setMark] = useState(false);

  const changeBtnStatus = {
    paid: "bg-paid text-paid",
    pending: "bg-pending text-pending",
    draft: "bg-draft",
  };

  // toggle EditInvoice
  const toggleEdit = () => {
    setOpenEditForm(!openEditForm);
  };

  // toggle DeletModal
  const toggleDelete = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const statusChange = ()=>{
    axios.patch(`https://invoice-api-9l7b.onrender.com/invoice/${id}`,{
      status: 'paid'
    }).then(res => console.log(res)).catch(err => console.log(err))
    navigate('/')
  }
 
  const [invoiceDetails,setInvoiceDetails] = useState({})
  const [address,setAddress] = useState([])
  const { id } = useParams();
  
  const fetchInvoice = useCallback( async () => {
    setLoaded(loaded)
    const resData = await axios.get(`https://invoice-api-9l7b.onrender.com/invoice/${id}`)
    const {data} = resData

      setInvoiceDetails(data)

    // console.log(invoiceDetails.clientName);

    setInvoiceDetails(data)
  },[id] )
  

  
  useEffect(() => {
    fetchInvoice()
  },[])

  let invoiceResult = []

  const grandTotal = () => {
    return invoiceDetails.items.reduce((result,item)=>{
      return result + item.total
    })
  }

  
  useEffect(() => {
    fetchInvoice();
  }, []);

  const getItems = Object.values(gTotal).reduce((t, { total }) => t + total, 0);

  const Hold = { ...invoiceDetails };

  return (
    <div>
      <main
        className={`viewinvoice-container ${
          darkMode ? "viewinvoice-container-dark" : ""
        }`}
      >
        <article className="all-components">
          <Link to="/" className="go-back cursor">
            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.342.886L2.114 5.114l4.228 4.228"
                stroke="#9277FF"
                stroke-width="2"
                fill="none"
                fill-rule="evenodd"
              />
            </svg>
            <h5> Go back</h5>
          </Link>
          <div
            className={`container-two ${darkMode ? "container-two-dark" : ""}`}
          >
            <div className="status-pending">
              <p className="status">Status</p>
              <div
                className={
                  "pending bg-opacity-5 " +
                  changeBtnStatus[invoiceDetails.status]
                }
              >
                <div
                  className={
                    "pending-dot " + changeBtnStatus[invoiceDetails.status]
                  }
                ></div>
                {invoiceDetails.status}
              </div>
            </div>

            <div className="buttons">
              <button className="edit cursor" onClick={toggleEdit}>
                Edit
              </button>
              <button className="delete cursor" onClick={toggleDelete}>
                Delete
              </button>
              <button
                disabled={status === "paid" ? true : false}
                className={`paid cursor ${
                  status === "paid"
                    ? "disabled:cursor-not-allowed not-allowed"
                    : ""
                }`}
                onClick={() => statusChange()}
              >
                Mark as Paid
              </button>
            </div>
          </div>

          <section
            className={`container-three ${
              darkMode ? "container-three-dark" : ""
            }`}
          >
            <div className="container-three-items">
              <div className="design-address">
                <div className="words">
                  <h3>
                    <span className={`${darkMode ? "dark-label" : "tag"}`}>
                      #
                    </span>
                    {id}
                  </h3>
                  <div className={`${darkMode ? "dark-label" : "words-words"}`}>
                    {invoiceDetails.description}
                  </div>
                </div>
                <div className="address">
                  <p>
                    {invoiceDetails.senderStreet}
                    <br />
                    {invoiceDetails.senderCity}
                    <br />
                    {invoiceDetails.senderPostCode}
                    <br />
                    {invoiceDetails.senderCountry}
                    <br />
                  </p>
                </div>
              </div>

              <div className="date-bill">
                <div className="invoice-date">
                  <p className={`${darkMode ? " dark-label" : " paragraph"}`}>
                    Invoice Date
                  </p>
                  <br />
                  <h4 className={`${darkMode ? "qwerty-dark" : "qwerty"}`}>
                    {invoiceDetails.createdAt}
                  </h4>
                </div>
                <div className="due-date">
                  <p className={`${darkMode ? " dark-label" : "paragraph"}`}>
                    Payment Due
                  </p>
                  <br />
                  <h4 className={`${darkMode ? "qwerty-dark" : "qwerty"}`}>
                    {invoiceDetails.paymentDue}
                  </h4>
                </div>

                <div className="bill-to-address">
                  <p className={`${darkMode ? " dark-label" : "paragraph"}`}>
                    Bill To
                  </p>

                  <br />

                  <h4 className={`${darkMode ? "qwerty-dark" : "qwerty"}`}>
                    {invoiceDetails.clientName}
                  </h4>

                  <br />

                  <p className={`${darkMode ? " dark-label" : "paragraph"}`}>
                    {invoiceDetails.clientStreet}
                    <br />
                    {invoiceDetails.clientCity}
                    <br />
                    {invoiceDetails.clientPostCode}
                    <br />
                    {invoiceDetails.clientCountry}
                    <br />
                  </p>
                </div>

                <div className="sent-to">
                  <p className={` ${darkMode ? "dark-label" : "paragraph"}`}>
                    Sent to
                  </p>
                  <br />
                  <h4 className={`${darkMode ? "qwerty-dark" : "qwerty"}`}>
                    {invoiceDetails.clientEmail}
                  </h4>
                </div>
              </div>

              <section
                className={`container-quantity ${
                  darkMode ? "container-quantity-dark" : ""
                }`}
              >
               
                  <div className="quantity-items">
                    {/* <div className="row flex border">
                      <div className="row-auto">Item name</div>
                      <div className="row">QTY.</div>
                      <div className="row">Price</div>
                      <div className="row">Total</div>
                    </div> */}
                    <table>
                      <thead>
                        <th>Item name</th>
                        <th>QTY.</th>
                        <th>Price</th>
                        <th>Total</th>
                      </thead>
                    </table>

                    {
                      invoiceDetails.items?.map((item,key)=>{
                        return (
                            <div className="row" key={key+"_item"}>
                              <div className="col">{item.name}</div>
                              <div className="col">{item.quantity}</div>
                              <div className="col">{item.price}</div>
                              <div className="col">{item.total}</div>
                            </div>
                        )
                      })
                    }
                    {
                      invoiceDetails.items?.map(i=> {
                        console.log(i.toString.to);
                      })
                    }
                  </div>
              </section>
              {
              //   loaded
              //   ? grandTotal
              //   // <div className={`blue-box ${
              //   //   darkMode ? "blue-box-dark" : ""
              //   // }`}>
              //   //   <div className="grand-total">Grand Total</div>
              //   //   <div className="amount">{ grandTotal }</div>
              //   // </div>
              // : console.log(loaded, grandTotal) 
              }

              <div className={`blue-box ${darkMode ? "blue-box-dark" : ""}`}>
                <div className="grand-total">Grand Total</div>
                <div className="amount">
                  {" "}
                  £ {grandTotal()}
                  {invoiceResult}
                </div>
              </div>
            </div>
            
          </section>
        </article>
        <div
          className={`small-show ${darkMode ? "buttons small-show-dark" : ""}`}
        >
          <button className="edit cursor" onClick={toggleEdit}>
            Edit
          </button>
          <button className="delete cursor" onClick={toggleDelete}>
            Delete
          </button>
          <button className="paid cursor" onClick={() => statusChange()}>
            Mark as Paid
          </button>
        </div>
      </main>

      {openEditForm && (
        <Edit
          darkMode={darkMode}
          goBack={toggleEdit}
          id={id}
          data={datas}
          hold={Hold}
        />
      )}
      {openDeleteModal && (
        <ConfirmDelete darkMode={darkMode} goBack={toggleDelete} id={id} />
      )}
    </div>
  );
}

export default Viewinvoice;

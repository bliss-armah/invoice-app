import React,{useState,useEffect,useCallback} from "react";
import "./Viewinvoice.css";
import { useParams, Link } from "react-router-dom";
import axios from 'axios'


function Viewinvoice({ darkMode }) {
  const [invoiceDetails,setInvoiceDetails] = useState({})
  const [address,setAddress] = useState([])
  const { id } = useParams();
  
  const fetchInvoice = useCallback( async () => {
    const resData = await axios.get(`https://invoice-api-9l7b.onrender.com/invoice/${id}`)
    const {data} = resData

    await  setInvoiceDetails({...data})

    console.log(invoiceDetails);
  },[id] )
  // for (const key in invoiceDetails.senderAddress){
  //   console.log(key);

  // }
  
  useEffect(() => {
    fetchInvoice()
  },[])

  
  return (
    <div>
      <main
        className={`viewinvoice-container ${
          darkMode ? "viewinvoice-container-dark" : ""
        }`}
      >
        <article className="all-components">
          <div className="go-back cursor">
            <img src="../../public/assets/icon-arrow-left.svg" />
            <h4> Go back</h4>
          </div>
          <div
            className={`container-two ${darkMode ? "container-two-dark" : ""}`}
          >
            <div className="status-pending">
              <p className="status">Status</p>
              <div className="pending">
                <div className="pending-dot"></div>
                {invoiceDetails.status}
              </div>
            </div>

            <div className="buttons">
              <button className="edit cursor">Edit</button>
              <button className="delete cursor">Delete</button>
              <button className="paid cursor">Mark as Paid</button>
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
                  <span>#</span>{id}
                </h3>
                <div className="words-words">{invoiceDetails.description}</div>
              </div>
              <div className="address">
                19 Union Terrace
                <br />
                {/* {invoiceDetails.senderAddress.city} */}
                London
                <br />
                E13EZ
                <br />
                United kingdom
              </div>
            </div>

            <div className="date-bill">
              <div className="invoice-date">
                <p>Invoice Date</p>
                <br />
                <h4>21 Aug 2021</h4>
              </div>
              <div className="due-date">
                <p>Payment Due</p>
                <br />
                <h4>20 Sep 2021</h4>
              </div>

              <div className="bill-to">
                <p>Bill To</p>
                <br />

                <h4>{invoiceDetails.clientName}</h4>

                <br />

                <p>
                  84 Church Way
                  <br />
                  Bradford
                  <br />
                  BD1 9PB
                  <br />
                  United Kingdom
                </p>
              </div>

              <div className="sent-to">
                <p>Sent to</p>
                <br />
                <h4>{invoiceDetails.clientEmail}</h4>
              </div>
              </div>

              <section
                className={`container-quantity ${
                  darkMode ? "container-quantity-dark" : ""
                }`}
              >
                <div className="quantity-items">
                  <div className="names"><span>Item Name</span>
                  <div className="banner">Banner Design</div>
                  <div className="email">Email Design</div>
                  </div>
                  <div className="quantity"><span>QTY.</span> 
                  <div className="quantity-one">1 </div>
                  <div className="quantity-two">2 </div>
                  </div>
                  <div className="price"><span>Price</span>
                  <div className="price-one"><span>x</span>£ 156.00</div>
                  <div className="price-two"><span>x</span>£ 200.00</div>
                  </div>
                  <div className="total"><span>Total</span>
                  <div className="total-one">£ 156.00</div>
          <div className="total-two">£ 400.00</div></div>
                </div>
              </section>


              <div className={`blue-box ${
                  darkMode ? "blue-box-dark" : ""
                }`}>
                <div className="grand-total">Grand Total</div>
                <div className="amount">£ 556.00</div>
              </div>

              </div>
            
          </section>
        </article>
      </main>
      <div className={`buttons small-show ${
                  darkMode ? "buttons small-show-dark" : ""
                }`}>
      <button className="edit cursor">Edit</button>
      <button className="delete cursor">Delete</button>
      <button className="paid cursor">Mark as Paid</button>
    </div>
  </div>
  );
}

export default Viewinvoice;

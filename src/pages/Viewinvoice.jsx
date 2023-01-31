import React,{useState,useEffect,useCallback} from "react";
import "./Viewinvoice.css";
import { useParams, Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import Edit from "../components/editInvoiceForm/Edit";
import ConfirmDelete from "../components/confirmDelete/ConfirmDelete"


function Viewinvoice({ darkMode }) {
  const navigate = useNavigate()
  const [openEditForm, setOpenEditForm] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [datas,setDatas] = useState({})

  const changeBtnStatus = {
    paid: "bg-paid text-paid",
    pending: "bg-pending text-pending",
    draft: "bg-draft",
}
 

  // toggle EditInvoice
  const toggleEdit= () => {
    setOpenEditForm(!openEditForm)
  }

  // toggle DeletModal
  const toggleDelete= () => {
    setOpenDeleteModal(!openDeleteModal)
  }

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

  },[id] )
  

  
  useEffect(() => {
    fetchInvoice()
  },[])

  let invoiceResult = []

  const grandTotal = () => {
    if(invoiceDetails.items?.length){
      if(invoiceDetails.items?.length === 1){
        invoiceDetails.items?.map((item)=> {
          invoiceResult.push((item.total).toFixed(2))
        })
      }
      invoiceDetails.items?.reduce((result,item)=> {
        invoiceResult.push((result.total + item.total).toFixed(2))
  
      })
      
    }
    
  }
  const Hold = {...invoiceDetails}

  return (
    
    <div>
      <main
        className={`viewinvoice-container ${
          darkMode ? "viewinvoice-container-dark" : ""
        }`}
      >
        <article className="all-components">
            <Link to="/" className="go-back cursor">
            <img src="../../public/assets/icon-arrow-left.svg" />
            <h4> Go back</h4>
            </Link>
          <div
            className={`container-two ${darkMode ? "container-two-dark" : ""}`}
          >
            <div className="status-pending">
              <p className="status">Status</p>
              <div className={"pending bg-opacity-5 " + changeBtnStatus[invoiceDetails.status]}>
                <div className={"pending-dot " + changeBtnStatus[invoiceDetails.status]}></div>
                {invoiceDetails.status}
              </div>
            </div>

            <div className="buttons">
              <button className="edit cursor" onClick={toggleEdit}>Edit</button>
              <button className="delete cursor" onClick={toggleDelete}>Delete</button>
              <button className="paid cursor" onClick={()=>statusChange()}>Mark as Paid</button>
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
                {/* <p>
                 {invoiceDetails.senderStreet}
                  <br />
                 {invoiceDetails.senderCity}
                  <br />
                 {invoiceDetails.senderPostCode}
                  <br />
                 {invoiceDetails.senderCountry}
                  <br />
                </p> */}
                {/* {console.log(invoiceDetails.senderAddress.city)} */}
                {/* {
                  invoiceDetails.senderAddress?.map((address,key)=> {
                    return (
                      <div key={key}>
                        {address.street}
                        <br />
                        {address.city}
                        <br />
                        {address.postCode}
                        <br />
                        {address.country}
                      </div>
                    )
                  })
                } */}
              </div>
                
            </div>

            <div className="date-bill">
              <div className="invoice-date">
                <p>Invoice Date</p>
                <br />
                <h4>{invoiceDetails.createdAt}</h4>
              </div>
              <div className="due-date">
                <p>Payment Due</p>
                <br />
                <h4>{invoiceDetails.paymentDue}</h4>
              </div>

              <div className="bill-to-address">
                <p>Bill To</p>
                <br />

                <h4>{invoiceDetails.clientName}</h4>

                <br />

                <p>
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
      <button className="edit cursor" onClick={toggleEdit}>Edit</button>
      <button className="delete cursor" onClick={toggleDelete}>Delete</button>
      <button className="paid cursor" onClick={()=>statusChange()}>Mark as Paid</button>
    </div>
    {
                openEditForm && <Edit darkMode={darkMode}  goBack={toggleEdit} id={id} data={datas} hold={Hold} />
            }
            {
                openDeleteModal && <ConfirmDelete darkMode={darkMode} goBack={toggleDelete} id={id} />

            }

  </div>
  );
}

export default Viewinvoice;

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

  const statusChange = () => {
    axios
      .patch(`https://invoice-api-9l7b.onrender.com/invoice/${id}`, {
        status: "paid",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    navigate("/");
  };

  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [address, setAddress] = useState([]);
  const [gTotal, setGTotal] = useState([]);
  const [status, setStatus] = useState("");
  const { id } = useParams();

  const fetchInvoice = useCallback(async () => {
    const resData = await axios.get(
      `https://invoice-api-9l7b.onrender.com/invoice/${id}`
    );
    const { data } = resData;
    setInvoiceDetails(data);
    setGTotal(data.items);
    setStatus(data.status);
  }, [id]);

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
                  <div className="names">
                    <span>Item Name</span>
                    {invoiceDetails.items?.map((harry, key) => {
                      return (
                        <div
                          className={`${darkMode ? "qwerty-dark" : "banner"}`}
                          key={key + "_harry"}
                        >
                          <div>{harry.name}</div>
                          {/* <div className="email">Email Design</div> */}
                        </div>
                      );
                    })}
                  </div>
                  <div className="quantity">
                    <span>QTY. </span>
                    {invoiceDetails.items?.map((harry, key) => {
                      return (
                        <div key={key + "_harry"}>
                          <div className="quantity-one"> {harry.quantity} </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="price">
                    <span>Price</span>
                    {invoiceDetails.items?.map((add, key) => {
                      return (
                        <div key={key + "_harry"}>
                          <div className="price-one">
                            <span>x</span>£ {add.price.toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="total">
                    <span>Total</span>
                    {invoiceDetails.items?.map((add, key) => {
                      return (
                        <div key={key + "_harry"}>
                          <div className="total-one">
                            £ {add.total.toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              <div className={`blue-box ${darkMode ? "blue-box-dark" : ""}`}>
                <div className="grand-total">Grand Total</div>
                <div className="amount">£ {getItems.toFixed(2)}</div>
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

import React, { useState, useEffect, useCallback } from "react";
import "./Viewinvoice.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Edit from "../components/editInvoiceForm/Edit";
import ConfirmDelete from "../components/confirmDelete/ConfirmDelete";
import { useDispatch, useSelector } from "react-redux";
import { addToInvoice } from "../invoiceSlice/InvoiceSlice";

function Viewinvoice() {
  const navigate = useNavigate();
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [datas, setDatas] = useState({});
  const { id } = useParams();
  const { invoiceData } = useSelector((state) => state.invoice);
 const dispatch = useDispatch()

  const darkMode = useSelector((state) => state.invoice.isDarkMode);
 const otherItems = invoiceData.filter((elt) => elt.id !== id);
  const selectedItem = invoiceData.find((elt) => elt.id === id);

   const currentDetail = {
    ...selectedItem,
    status: 'paid',
  }
  const statusChange = () => {
    axios
    .patch(`https://invoice-api-9l7b.onrender.com/invoice/${id}`, currentDetail)
    .then(() =>dispatch(addToInvoice([...otherItems,currentDetail])))
    .catch((err) => console.log(err))
  };

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
          {invoiceData
            .filter((item) => item.id === id)
            .map((item) => (
              <>
                <div
                  className={`container-two ${
                    darkMode ? "container-two-dark" : ""
                  }`}
                >
                  <div className="status-pending">
                    <p className="status">Status</p>
                    <div
                      className={
                        "pending bg-opacity-5 " + changeBtnStatus[item.status]
                      }
                    >
                      <div
                        className={
                          "pending-dot " + changeBtnStatus[item.status]
                        }
                      ></div>
                      {item.status}
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
                      disabled={item.status === "paid" ? true : false}
                      className={`paid cursor ${
                        item.status === "paid"
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
                          <span
                            className={`${darkMode ? "dark-label" : "tag"}`}
                          >
                            #
                          </span>
                          {id}
                        </h3>
                        <div
                          className={`${
                            darkMode ? "dark-label" : "words-words"
                          }`}
                        >
                          {item.description}
                        </div>
                      </div>
                      <div className="address">
                        <p>
                          {item.senderStreet}
                          <br />
                          {item.senderCity}
                          <br />
                          {item.senderPostCode}
                          <br />
                          {item.senderCountry}
                          <br />
                        </p>
                      </div>
                    </div>

                    <div className="date-bill">
                      <div className="invoice-date">
                        <p
                          className={`${
                            darkMode ? " dark-label" : " paragraph"
                          }`}
                        >
                          Invoice Date
                        </p>
                        <br />
                        <h4
                          className={`${darkMode ? "qwerty-dark" : "qwerty"}`}
                        >
                          {item.createdAt}
                        </h4>
                      </div>
                      <div className="due-date">
                        <p
                          className={`${
                            darkMode ? " dark-label" : "paragraph"
                          }`}
                        >
                          Payment Due
                        </p>
                        <br />
                        <h4
                          className={`${darkMode ? "qwerty-dark" : "qwerty"}`}
                        >
                          {item.paymentDue}
                        </h4>
                      </div>

                      <div className="bill-to-address">
                        <p
                          className={`${
                            darkMode ? " dark-label" : "paragraph"
                          }`}
                        >
                          Bill To
                        </p>

                        <br />

                        <h4
                          className={`${darkMode ? "qwerty-dark" : "qwerty"}`}
                        >
                          {item.clientName}
                        </h4>

                        <br />

                        <p
                          className={`${
                            darkMode ? " dark-label" : "paragraph"
                          }`}
                        >
                          {item.clientStreet}
                          <br />
                          {item.clientCity}
                          <br />
                          {item.clientPostCode}
                          <br />
                          {item.clientCountry}
                          <br />
                        </p>
                      </div>

                      <div className="sent-to">
                        <p
                          className={` ${
                            darkMode ? "dark-label" : "paragraph"
                          }`}
                        >
                          Sent to
                        </p>
                        <br />
                        <h4
                          className={`${darkMode ? "qwerty-dark" : "qwerty"}`}
                        >
                          {item.clientEmail}
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
                          {item.items?.map((add, key) => {
                            return (
                              <div
                                className={`${
                                  darkMode ? "qwerty-dark" : "banner"
                                }`}
                                key={key + "_harry"}
                              >
                                <div>{add.name}</div>
                                {/* <div className="email">Email Design</div> */}
                              </div>
                            );
                          })}
                        </div>
                        <div className="quantity">
                          <span>QTY. </span>
                          {item.items?.map((add, key) => {
                            return (
                              <div key={key + "_harry"}>
                                <div className="quantity-one">
                                  {" "}
                                  {add.quantity}{" "}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="price">
                          <span>Price</span>
                          {item.items?.map((add, key) => {
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
                          {item.items?.map((add, key) => {
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

                    <div
                      className={`blue-box ${darkMode ? "blue-box-dark" : ""}`}
                    >
                      <div className="grand-total">Grand Total</div>
                      <div className="amount">£ {item.total}</div>
                    </div>
                  </div>
                </section>
              </>
            ))}
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

      {openEditForm && <Edit goBack={toggleEdit} id={id} data={datas} />}
      {openDeleteModal && <ConfirmDelete goBack={toggleDelete} id={id} />}
    </div>
  );
}

export default Viewinvoice;

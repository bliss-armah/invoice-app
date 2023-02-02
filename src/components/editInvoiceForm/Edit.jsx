import React, { useEffect, useState } from "react";
import "./Edit.css";
import ArrowDown from "../../../public/assets/icon-arrow-down.svg"
import axios from "axios";
import { useParams } from "react-router-dom";
const Edit = ({ darkMode, goBack,hold}) => {
  const {id} = useParams()

  const CANT_BE_EMPTY = "Can't be empty";

  
  const initialData = {
    senderStreet: "",
    senderCity: "",
    senderPostCode: "",
    senderCountry: "",
    clientName: "",
    clientEmail: "",
    clientStreet: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
    createdAt: "",
    paymentDue: '',
    description: "",
  }

   const [invoiceData, setInvoiceData] = useState(initialData);

  const [invoiceItemsVals, setInvoiceItemVals] = useState({});
  const [totalPrice, setTotalPrice] = useState({});

  const [formErrors, setFormErrors] = useState({});
  const [fieldsError, setFieldsError] = useState("");
  const [itemsError, setItemsError] = useState("");
  const [word, setWord] = useState("Net 30 Days");
  const [isClicked, setIsClicked] = useState(false);
  const [saveClicked, setSaveClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const changeValue = (value) => {
    setWord(value);
    setIsClicked(!isClicked);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.value !== "") {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    } else {
      setFormErrors({ ...formErrors, [e.target.name]: CANT_BE_EMPTY });
    }
    setInvoiceData({ ...invoiceData, [name]: value });
  };



  const itemHandleChange = (e, id) => {
    const invoiceItemCurrent = { ...invoiceItemsVals[id] };
    invoiceItemCurrent[e.target.name] =
      e.target.name === "name" ? e.target.value : Number(e.target.value);
    setInvoiceItemVals({
      ...invoiceItemsVals,
      [id]: invoiceItemCurrent,
    });
  };

  

  const handleDeleteItem = (id) => {
    const filteredInvoiceItems = Object.keys(invoiceItemsVals).filter(
      (elt) => elt !== id
    );
    const dataObj = {};
    filteredInvoiceItems.forEach(
      (elt) => (dataObj[elt] = invoiceItemsVals[elt])
    );
    setInvoiceItemVals(dataObj);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const newId = Object.keys(invoiceItemsVals).length;
    console.log(invoiceItemsVals)
    setInvoiceItemVals({
      ...invoiceItemsVals,
      [newId]: { name: "", quantity: 0, price: 0.0 }
    });
  };

  useEffect(() => {
    if (Object.keys(invoiceData).length < 14) {
      setFieldsError("All fields are required.");
    } else {
      setFieldsError([""]);
    }
  }, [invoiceData]);

  useEffect(() => {
    if (Object.keys(invoiceItemsVals).length > 0) {
      setItemsError("");
    } else {
      setFieldsError("An item must be added");
    }
  }, [invoiceItemsVals]);

  useEffect(() => {
    if (invoiceData.createdAt) {
      const date = new Date(invoiceData.createdAt);
      const days = Number(word.split(" ")[1]);
      date.setDate(date.getDate() + days);
      setInvoiceData({
        ...invoiceData,
        paymentDue: date.toISOString().substring(0, 10),
      });
    }
  }, [invoiceData.createdAt, word]);

  useEffect(() => {
    const totalProductObj = {};
    Object.keys(invoiceItemsVals).forEach((id) => {
      const values = invoiceItemsVals[id];
      totalProductObj[id] = Number(values.price) * Number(values.quantity) || 0;
    });
    setTotalPrice(totalProductObj);
  }, [invoiceItemsVals]);

  const validateItems = (elt) => {
    const [name, quantity, price] = Object.values(elt);
    return (name !== '') && (quantity > 0) && (price > 0.0);
  }

  useEffect(() => {
    if (saveClicked) {
      validate(invoiceData, invoiceItemsVals);
    }
  }, [invoiceData, invoiceItemsVals]);
  
  const validate = (values, invoiceItemsVals) => {
    const empty_fields = {};
    let isValid = true;

    Object.entries(invoiceData).forEach((elt) => {
      const [key, value] = elt;
      if (value === "") empty_fields[key] = CANT_BE_EMPTY;
    });

    setFormErrors({ ...formErrors, ...empty_fields });

    if (Object.keys(empty_fields).length > 0) {
      setFieldsError(["All fields are required"]);
      isValid = false;
    }
    if (Object.keys(invoiceItemsVals).length === 0) {
      setItemsError(["An item must be added"]);
      isValid = false;
    }

    // if (Object.keys(invoiceItemsVals).length > 0){
    //   if (!(Object.values(invoiceItemsVals).every((elt) => validateItems(elt) === true))) {
    //     setErrors([...errors, 'An Item must be added']);
    //     setFormIsValid(false);
    //   }
    if (isValid) sendData(values, invoiceItemsVals);
  };
 
  const sendData = (e) => {
    setInvoiceData(initialData);
    const addedPriceToItems = {};
    Object.keys(invoiceItemsVals).forEach((elt) => {
      const obj = { ...invoiceItemsVals[elt] };
      obj["totalPrice"] = totalPrice[elt];
      addedPriceToItems[elt] = obj;
    })
      axios
        .patch(`https://invoice-api-9l7b.onrender.com/invoice/${id}`, {
          senderStreet: invoiceData.senderStreet,
          senderCity: invoiceData.senderCity,
          senderPostCode: invoiceData.senderPostCode,
          senderCountry: invoiceData.senderCountry,
          clientName: invoiceData.clientName,
          clientEmail: invoiceData.clientEmail,
          clientStreet: invoiceData.clientStreet,
          clientCity: invoiceData.clientCity,
          clientPostCode: invoiceData.clientPostCode,
          clientCountry: invoiceData.clientCountry,
          description: invoiceData.description,
          items: Object.values(invoiceItemsVals),
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validate(invoiceData, invoiceItemsVals);
  };


  return (
    <main className="all">
      <form
        className={`sections ${
          darkMode ? "dark-section " : "light-section"
        }`}
        onSubmit={handleSubmit}
      >
        <div className="form-contents">
          <div className="navigate">
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
          Go back
          </div>
          <h4 className={`title ${darkMode ? "dark-title" : "light-title"}`}>
            Edit <span className="titleh">#</span>{id}
          </h4>
          <form
            className={`form-section ${
              darkMode ? "dark-scroll" : "light-scroll"
            }`}
          >
            <div className="bill-form-section">
              <h4 className="form-title-head">bill from</h4>
              <div className="form-title-section">
                <div className="message">

                <p
                  className={`form-title ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  street address
                </p>

                <p className="error">{formErrors.senderStreet}</p>
                    </div>
              </div>

              <input
                className={ `in ${darkMode ? "dark-input" : "light-input "} ${formErrors ? '' : ''}`}
                type="text"
                name="senderStreet"
                value={hold.senderStreet}
                onChange={handleChange}
              />
              <div className="addresses">
                <div className="addresses-row">

                <div className="city">
                <div className="form-title-section">
                    <div className="message city-message">

                <p
                  className={`form-title ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                  >
                  city
                </p>

                <p className="error">{formErrors.senderCity}</p>
                    </div>
              </div>
                  <input
                    className={`city-in in ${darkMode ? "dark-input" : "light-input"}`}
                    type="text"
                    name="senderCity"
                    value={hold.senderCity}
                    onChange={handleChange}
                    />
                </div>

                <div className="post">
                <div className="form-title-section post-message ">
                <p
                  className={`form-title  ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                  >
                  post code
                </p>

                <p className="error">{formErrors.senderPostCode}</p>
              </div>
                  <input
                    className={`post-in in ${darkMode ? "dark-input" : "light-input"}`}
                    type="number"
                    name="senderPostCode"
                    value={hold.senderPostCode}
                    onChange={handleChange}
                    />
                </div>
                    </div>
                <div className="county">
                <div className="  form-title-section">
                    <div className="country-message">

                <p
                  className={`form-title   ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  country
                </p>

                <p className="error">{formErrors.senderCountry}</p>
                    </div>
              </div>
                  <input
                    className={`county-in in ${darkMode ? "dark-input" : "light-input"}`}
                    type="text"
                    name="senderCountry"
                    value={hold.senderCountry}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="bill-form-section">
              <h4 className="form-title-head">bill from</h4>
              <div className="form-title-section">
                <div className="message">

                <p
                  className={`form-title ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  client's name
                </p>

                <p className="error">{formErrors.clientName}</p>
                    </div>
              </div>
              <input
                className={` in ${darkMode ? "dark-input" : "light-input"}`}
                type="text"
                name="clientName"
                value={hold.clientName}
                onChange={handleChange}
              />
              <div className="form-title-section">
                <div className="message">

                <p
                  className={`form-title ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  client's email
                </p>

                <p className="error">{formErrors.clientEmail}</p>
                    </div>
              </div>
              <input
                className={` in ${darkMode ? "dark-input" : "light-input"}`}
                type="email"
                name="clientEmail"
                value={hold.clientEmail}
                onChange={handleChange}
              />
              <div className="form-title-section">
                <div className="message">

                <p
                  className={`form-title ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  street address
                </p>

                <p className="error">{formErrors.clientStreet}</p>
              </div>
              </div>
              <input
                className={` in ${darkMode ? "dark-input" : "light-input"}`}
                type="text"
                name="clientStreet"
                value={hold.clientStreet}
                onChange={handleChange}
              />

              <div className="addresses">
                <div className="addresses-row">

                <div className="city">
                <div className="form-title-section city-message">
                <p
                  className={`form-title ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                >
                  city
                </p>

                <p className="error">{formErrors.clientCity}</p>
              </div>
                  <input
                    className={`city-in in ${darkMode ? "dark-input" : "light-input"}`}
                    type="text"
                    name="clientCity"
                    value={hold.clientCity}
                    onChange={handleChange}
                    />
                </div>
                <div className="post">
                <div className="form-title-section post-message">
                <p
                  className={`form-title ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                  >
                  post code
                </p>

                <p className="error">{formErrors.clientPostCode}</p>
              </div>
                  <input
                    className={`post-in in ${darkMode ? "dark-input" : "light-input"}`}
                    type="number"
                    name="clientPostCode"
                    value={hold.clientPostCode}
                    onChange={handleChange}
                    />
                </div>
                    </div>
                <div >
                <div className="form-title-section">
                <div className="country-message">
                <p
                  className={`form-title ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                >
                  country
                </p>

                <p className="error">{formErrors.clientCountry}</p>
                </div>
              </div>
                  <input
                    className={`county-in in ${darkMode ? "dark-input" : "light-input"}`}
                    type="text"
                    name="clientCountry"
                value={hold.clientCountry}
                onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Invoice setup */}
            <div className="invoice">
              <div className="invoice-row">
                <div>
                <div className="form-title-section">
                <p
                  className={`form-title ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                >
                  invoice date
                </p>

                <p className="error">{formErrors.invoiceDate}</p>
              </div>
                  <input
                    className={`invoice-inputs in ${darkMode ? "dark-input" : "light-input"}`}
                    type="date"
                    name="invoiceDate"
                value={hold.invoiceDate}
                onChange={handleChange}
                  />
                </div>
                <div className="selects">
                <div className="form-title-section">
                <p
                  className={`form-title ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                >
                  payment terms
                </p>
              </div>
              <div className={`selects-item ${darkMode ? "dark-select-items ":" light-select-items"}`}>
                <div className="main" onClick={handleClick}>
                   <p> {word}</p>
                   <div className={`arrows ${isClicked ? 'arrows-rotate' : '' }`} >
                   <img src={ArrowDown} alt="" />
                   </div>
                </div>
                
                    {
                        isClicked &&<>
                        <div className={`options ${darkMode ? "dark-options ":" light-options"}`}>
                <h6 onClick={()=>changeValue("Net 1 day")}>Net 1 day</h6>
                        <div className={`hr ${darkMode?"dark-hr" : "light-hr"}`}></div>
                        <h6  onClick={()=>changeValue("Net 7 days")}>Net 7 days</h6>
                        <div className={`hr ${darkMode?"dark-hr" : "light-hr"}`} ></div>
                        <h6 onClick={()=>changeValue("Net 14 days")}>Net 14 days</h6>
                        <div className={`hr ${darkMode?"dark-hr" : "light-hr"}`}></div>
                        <h6 onClick={()=>changeValue("Net 30 days")}>Net 30 days</h6>
                </div>

                        </> 
                    }
                    
              </div>
                 
                </div>
              </div>
              <div>
              <div className="form-title-section">
                <div className="mess">

                <p
                  className={`form-title ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  project description
                </p>

                <p className="error">{formErrors.description}</p>
                    </div>
              </div>
                <input
                  className={`project-in in ${darkMode ? "dark-input" : "light-input"}`}
                  type="text"
                  name="description"
                value={hold.description}
                onChange={handleChange}
                />
              </div>
            </div>
            <section className="items-section">
              <h2 className=" items-title">Item List</h2>

              {Object.keys(invoiceItemsVals).map((item) => 
              <div className=" items-content" key={item}>
                <div className="item-name">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Item Name
                  </label>
                  <input
                    className={`item-name ${
                      darkMode ? "input-select-dark " : ""
                    }`}
                    // key={item}
                    type="text"
                    name="name"
                    onChange={(event) => itemHandleChange(event, item)}
                  />
                </div>
                <div className="item-quantity">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Qty.
                  </label>
                  <input
                    className={`item-quantity ${
                      darkMode ? "input-select-dark " : ""
                    }`}
                    type="number"
                    min="0"
                    name="quantity"
                    onChange={(event) => itemHandleChange(event, item)}
                  />
                </div>

                <div className="item-price">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Price
                  </label>
                  <input
                    className={`item-price ${
                      darkMode ? "input-select-dark " : ""
                    }`}
                    type="number"
                    min="0"
                    name="price"
                    onChange={(event) => itemHandleChange(event, item)}
                  />
                    </div>

                  <div className="item-total-price">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      Total
                    </label>
                    <div className="total-price-down">

                    <p className="total-price" name="totalPrice">
                      {Number(totalPrice[item]).toFixed(2)}
                    </p>

                    <div
                      className="item-delete-svg"
                      onClick={() => handleDeleteItem(item)}
                    >
                      <svg
                        width="13"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                          fill="#888EB0"
                          fillRule="nonzero"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              )}
              <button
      className={`add-item-button ${
        darkMode ? "add-item-button-dark" : "add-item-button-light"
      }`}
      onClick={handleAddItem}
    >
      + Add New Item
    </button>
            </section>
          </form>
          <div className="error">
          <p>- {fieldsError} </p>
            <p>- {itemsError} </p>
          </div>
        </div>
        <div className="edit-invoice-button">
          <div className="edit-button-section">
            <button
              className={`cancel-btn ${
                darkMode ? "dark-cancel-btn" : "light-cancel-btn"
              }`}
              onClick={goBack}
            >
              cancel
            </button>
            <button type="submit" className="save-btn" >save changes</button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Edit;

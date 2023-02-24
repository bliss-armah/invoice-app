import React, { useEffect, useState } from "react";
import "./Edit.css";
import ArrowDown from "../../../public/assets/icon-arrow-down.svg"
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { addToInvoice } from "../../invoiceSlice/InvoiceSlice";
const Edit = ({ goBack, id}) => {
 
  const dispatch = useDispatch()

  const { invoiceData: presentData } = useSelector((state) => state.invoice);
  const otherItems = presentData.filter((elt) => elt.id !== id);
  const selectedItem = presentData.find((elt) => elt.id === id);


  const CANT_BE_EMPTY = "Can't be empty";

  const darkMode = useSelector((state) => state.invoice.isDarkMode)
  const [invoiceData, setInvoiceData] = useState(selectedItem);
  const [invoiceItemsVals, setInvoiceItemVals] = useState({});
  const [total, setTotal] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [fieldsError, setFieldsError] = useState("");
  const [itemsError, setItemsError] = useState("");
  const [word, setWord] = useState(selectedItem.paymentDue);
  const [isClicked, setIsClicked] = useState(false);
  const [saveClicked, setSaveClicked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  

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
      setIsValid(true);
    } else {
      setFormErrors({ ...formErrors, [e.target.name]: CANT_BE_EMPTY });
      setIsValid(false);
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
    setInvoiceItemVals({
      ...invoiceItemsVals,
      [newId]: { name: "", quantity: 0, price: 0.0 }
    });
  };
  
  useEffect(() => {
    if (submitted) {
      if (Object.keys(invoiceData).length < 14) {
        setFieldsError("All fields are required.");
      } else {
        setFieldsError([""]);
      }
    }
  }, [invoiceData]);
  
  useEffect(() => {
    if (submitted) {
      if (Object.keys(invoiceItemsVals).length < 1) {
        setFieldsError("An item must be added");
      } else {
        setItemsError([""]);
      }
    }
  }, [invoiceItemsVals]);
  

  useEffect(() => {
    const totalProductObj = {};
    Object.keys(invoiceItemsVals).forEach((id) => {
      const values = invoiceItemsVals[id];
      totalProductObj[id] = Number(values.price) * Number(values.quantity) || 0;
    });
    setTotal(totalProductObj);
  }, [invoiceItemsVals]);



  useEffect(() => {
    const test = []
    selectedItem.items?.forEach((elt) => {
      test.push(elt)
    });
    setInvoiceItemVals(test);
  }, [])
  

  
  useEffect(() => {
    if (saveClicked) {
      validate(invoiceData, invoiceItemsVals);
    }
  }, [invoiceData, invoiceItemsVals]);
  
  const validate = (values, invoiceItemsVals) => {
    const empty_fields = {};
    let isValid = true;

    const requestData = { 
      ...values, 
      createdAt: selectedItem.createdAt,
      paymentDue: word 
    }

    Object.entries(requestData).forEach((elt) => {
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

    console.log(empty_fields, invoiceItemsVals)
    if (isValid) sendData(requestData, invoiceItemsVals);
  };
 
  const sendData = (invoiceData,invoiceItemsVals) => {
    const addedPriceToItems = {};
    let grandTotal = 0
    Object.keys(invoiceItemsVals).forEach((elt) => {
      const obj = { ...invoiceItemsVals[elt] };
      obj["total"] = total[elt];
      grandTotal += Number(total[elt]);
      addedPriceToItems[elt] = obj;
    });
   const currentDetail = {
    ...selectedItem,
    status: 'pending',
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
    items: Object.values(addedPriceToItems),
    total:grandTotal,
  }

  axios
    .patch(`https://invoice.rantsnconfess.com/api/v1/invoice/${id}`,currentDetail)
    .then(() => {
      dispatch(addToInvoice([...otherItems,currentDetail]))
      console.log('success')
    })
    .catch((err) => console.log(err));
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true)
    validate(invoiceData, invoiceItemsVals);
    goBack()
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
          <div onClick={goBack} className="navigate">
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
          Go back
          </div>
          <h4 className={`title ${darkMode ? "dark-title" : "light-title"}`}>
            Edit <span className="titleh">#</span>{id}
          </h4>
          <form
            className={`form-section  ${
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

                <p className="errorr">{formErrors.senderStreet}</p>
                    </div>
              </div>

              <input
                className={ `in ${darkMode ? "dark-input" : "light-input "} ${formErrors.senderStreet? "border-error" :""}`}
                type="text"
                name="senderStreet"
                value={invoiceData.senderStreet}
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

                <p className="errorr">{formErrors.senderCity}</p>
                    </div>
              </div>
                  <input
                    className={`city-in in ${darkMode ? "dark-input" : "light-input"} ${formErrors.senderCity? "border-error" :""}`}
                    type="text"
                    name="senderCity"
                    value={invoiceData.senderCity}
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

                <p className="errorr">{formErrors.senderPostCode}</p>
              </div>
                  <input
                    className={`post-in in ${darkMode ? "dark-input" : "light-input"} ${formErrors.senderPostCode? "border-error" :""}`}
                    type="text"
                    name="senderPostCode"
                    maxLength="5"
                    minLength="5"
                    value={invoiceData.senderPostCode}
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

                <p className="errorr">{formErrors.senderCountry}</p>
                    </div>
              </div>
                  <input
                    className={`county-in in ${darkMode ? "dark-input" : "light-input"} ${formErrors.senderCountry? "border-error" :""}`}
                    type="text"
                    name="senderCountry"
                    value={invoiceData.senderCountry}
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

                <p className="errorr">{formErrors.clientName}</p>
                    </div>
              </div>
              <input
                className={` in ${darkMode ? "dark-input" : "light-input"} ${formErrors.clientName? "border-error" :""}`}
                type="text"
                name="clientName"
                value={invoiceData.clientName}
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

                <p className="errorr">{formErrors.clientEmail}</p>
                    </div>
              </div>
              <input
                className={` in ${darkMode ? "dark-input" : "light-input"} ${formErrors.clientEmail? "border-error" :""}`}
                type="email"
                name="clientEmail"
                value={invoiceData.clientEmail}
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

                <p className="errorr">{formErrors.clientStreet}</p>
              </div>
              </div>
              <input
                className={` in ${darkMode ? "dark-input" : "light-input"} ${formErrors.clientStreet? "border-error" :""}`}
                type="text"
                name="clientStreet"
                value={invoiceData.clientStreet}
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

                <p className="errorr">{formErrors.clientCity}</p>
              </div>
                  <input
                    className={`city-in in ${darkMode ? "dark-input" : "light-input"} ${formErrors.clientCity? "border-error" :""}`}
                    type="text"
                    name="clientCity"
                    value={invoiceData.clientCity}
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

                <p className="errorr">{formErrors.clientPostCode}</p>
              </div>
                  <input
                    className={`post-in in ${darkMode ? "dark-input" : "light-input"} ${formErrors.clientPostCode? "border-error" :""}`}
                    type="text"
                    name="clientPostCode"
                    value={invoiceData.clientPostCode}
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

                <p className="errorr">{formErrors.clientCountry}</p>
                </div>
              </div>
                  <input
                    className={`county-in in ${darkMode ? "dark-input" : "light-input"} ${formErrors.clientCountry? "border-error" :""}`}
                    type="text"
                    name="clientCountry"
                value={invoiceData.clientCountry}
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

                <p className="errorr">{formErrors.invoiceDate}</p>
              </div>
                  <input
                    className={`invoice-inputs opacity-50 in ${darkMode ? "dark-input" : "light-input"} ${formErrors.invoiceDate? "border-error" :""}`}
                    // disabled={true}
                    type="date"
                    name="invoiceDate"
                value={invoiceData.createdAt}
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
              <div className="project-description">
              <div className="form-title-section">
                <div className="mess">

                <p
                  className={`form-title ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  project description
                </p>

                <p className="errorr">{formErrors.description}</p>
                    </div>
              </div>
                <input
                  className={`project-in in ${darkMode ? "dark-input" : "light-input"} ${formErrors.description? "border-error" :""}`}
                  type="text"
                  name="description"
                value={invoiceData.description}
                onChange={handleChange}
                />
              </div>
            </div>
            <section className="items-section">
              <h2 className=" items-title">Item List</h2>

              {Object.keys(invoiceItemsVals).map((item) => (
                <div className=" items-content" key={item}>
                  <div className="item-name">
                    <label
                      key={item}
                      className={`_label ${darkMode ? "labelDark " : ""}  ${
                        item > 0 ? "hide-title" : "display-title"
                      }`}
                    >
                      Item Name
                    </label>
                    <input
                      className={`_input  item-name ${
                        darkMode ? "inputSelectDark " : ""
                      }`}
                      type="text"
                      name="name"
                      value={invoiceItemsVals[item]['name']}
                      onChange={(event) => itemHandleChange(event, item)}
                    />
                  </div>
                  <div className="item-quantity">
                    <label key={item} className={`_label ${darkMode ? "labelDark " : ""}  ${
                        item > 0 ? "hide-title" : "display-title"
                      }`}>
                      Qty.
                    </label>
                    <input
                      className={`_input item-quantity ${
                        darkMode ? "inputSelectDark " : ""
                      }`}
                      type="number"
                      min="0"
                      value={invoiceItemsVals[item]['quantity']}
                      name="quantity"
                      onChange={(event) => itemHandleChange(event, item)}
                    />
                  </div>

                  <div className="item-price">
                    <label key={item} className={`_label ${darkMode ? "labelDark " : ""}  ${
                        item > 0 ? "hide-title" : "display-title"
                      }`}>
                      Price
                    </label>
                    <input
                      className={`_input item-price ${
                        darkMode ? "inputSelectDark " : ""
                      }`}
                      type="number"
                      min="0"
                      name="price"
                      value={invoiceItemsVals[item]['price']}
                      onChange={(event) => itemHandleChange(event, item)}
                    />
                  </div>

                  <div className="item-total-price">
                    <label key={item} className={`_label ${darkMode ? "labelDark " : ""}  ${
                        item > 0 ? "hide-title" : "display-title"
                      }`}>
                      Total
                    </label>
                    <div className={`total-price-down ${item > 0 ? 'total-price-down-desktop': ''}`}>
                      <p className="total-price" name="total">
                        {Number(total[item]).toFixed(2)}
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
              ))}

              <button
                className={`add-item-button ${
                  darkMode ? "add-item-button-dark" : "add-item-button-light"
                }`}
                onClick={handleAddItem}
              >
      + Add New Item
    </button>
    <div className="box"></div>

            </section>
          </form>
          
        </div>
        <div className="edit-invoice-button">
        <div className="error error-down">
        <p>{fieldsError !== '' && '-'} {fieldsError} </p>
            <p>{itemsError !== '' && '-'} {itemsError} </p>
          </div>
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

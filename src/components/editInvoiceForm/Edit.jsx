import React, { useEffect, useState } from "react";
import "./Edit.css";
import ArrowDown from "../../../public/assets/icon-arrow-down.svg"
import axios from "axios";

const Edit = ({ darkMode }) => {


  const [invoiceData, setInvoiceData] = useState({
    address: "",
    city: "",
    post: "",
    country: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    clientCity: "",
    clientPost: "",
    clientCountry: "",
    invoiceDate: "",
    project:"",
    item:"",
    quantity:0,
    price:0.00,

    
  });


  const [formErrors, setFormErrors] = useState({});
  const [word,setWord] = useState('Net 30 Days')
  const [isClicked,setIsClicked] = useState(false)

 

  const handleClick= () =>{
    setIsClicked(!isClicked)
  }

  const changeValue = (value) =>{
    setWord(value)
    setIsClicked(!isClicked)

  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInvoiceData({ ...invoiceData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(invoiceData));
    if (
      invoiceData.address&&
      invoiceData.city &&
      invoiceData.post &&
      invoiceData.country &&
      invoiceData.clientName &&
      invoiceData.clientEmail &&
      invoiceData.clientAddress &&
      invoiceData.clientCity &&
      invoiceData.clientPost &&
      invoiceData.clientCountry &&
      invoiceData.invoiceDate &&
      invoiceData.project &&
      invoiceData.item &&
      invoiceData.quantity &&
      invoiceData.price
    ) {
      setInvoiceData({
        city: "",
        address:"",
        post: "",
        country: "",
        clientName: "",
        clientEmail: "",
        clientAddress: "",
        clientCity: "",
        clientPost: "",
        clientCountry: "",
        invoiceDate:"",
        project:"",
        item:"",
        quantity:0,
        price:0.00
      });
      axios.patch(`https://invoice-api-9l7b.onrender.com/invoice/${blissYeah}`,{
        address:invoiceData.address,
        city:invoiceData.city,
        post:invoiceData.post,
        country:invoiceData.country,
        clientName:invoiceData.clientName,
        clientEmail:invoiceData.clientEmail,
        clientAddress:invoiceData.clientAddress,
        clientCity:invoiceData.clientCity,
        clientPost:invoiceData.clientPost,
        clientCountry:invoiceData.clientCountry,
        invoiceDate:invoiceData.invoiceDate,
        project:invoiceData.project,
        item:invoiceData.item,
        quantity:invoiceData.quantity,
        price:invoiceData.price
      }).then(res => console.log(res)).catch(err => console.log(err))
    }
    }
    const blissYeah = "RT3080"
    // useEffect(()=>{
    //   handleSubmit
    // },[invoiceData])
   

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex =
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    if (!values.address) {
      errors.address = "Can't be empty";
    }
    if (!values.clientAddress) {
        errors.clientAddress = "Can't be empty";
      }
      if (!values.city) {
        errors.city = "Can't be empty";
      }
      if (!values.clientCity) {
        errors.clientCity = "Can't be empty";
      }
      if (!values.country) {
        errors.country = "Can't be empty";
      }
      if (!values.clientCountry) {
        errors.clientCountry = "Can't be empty";
      }
      if (!values.clientName) {
        errors.clientName = "Can't be empty";
      }
    if (!values.clientEmail) {
      errors.clientEmail = "Can't be empty";
    } else if (!regex.test(values.clientEmail)) {
      errors.email = "This is not a valid email";
    }
    if (!values.post) {
      errors.post = "Can't be empty";
    } 
    if (!values.clientPost) {
        errors.clientPost = "Can't be empty";
      } 
    if (!values.invoiceDate) {
        errors.invoiceDate = "Can't be empty";
      } 
      
      if (!values.project) {
          errors.project = "Can't be empty";
        }
        if (!values.item && !values.quantity && !values.price) {
          errors.item = "-All fields must be added";
          errors.quantity = "-An item must be added"
        } 
      
       
    return errors;
  };
  return (
    <main>
      <form
        className={`section ${
          darkMode ? "dark-section " : "light-section"
        }`}
        onSubmit={handleSubmit}
      >
        <div className="form-content">
          <div className="back-button">
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
          Go back
          </div>
          <h4 className={`title ${darkMode ? "dark-title" : "light-title"}`}>
            Edit <span className="titleh">#</span>XM9141
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

                <p className="error">{formErrors.address}</p>
                    </div>
              </div>

              <input
                className={ `in ${darkMode ? "dark-input" : "light-input "} ${formErrors ? '' : ''}`}
                type="text"
                name="address"
                value={invoiceData.address}
                onChange={handleChange}
              />
              <div className="addresses">
                <div className="addresses-row">

                <div className="city">
                <div className="form-title-section">
                    <div className="message">

                <p
                  className={`form-title ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                  >
                  city
                </p>

                <p className="error">{formErrors.city}</p>
                    </div>
              </div>
                  <input
                    className={`city-in in ${darkMode ? "dark-input" : "light-input"}`}
                    type="text"
                    name="city"
                    value={invoiceData.city}
                    onChange={handleChange}
                    />
                </div>

                <div className="post">
                <div className="form-title-section ">
                <p
                  className={`form-title  ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                  >
                  post code
                </p>

                <p className="error">{formErrors.post}</p>
              </div>
                  <input
                    className={`post-in in ${darkMode ? "dark-input" : "light-input"}`}
                    type="number"
                    name="post"
                    value={invoiceData.post}
                    onChange={handleChange}
                    />
                </div>
                    </div>
                <div>
                <div className="form-title-section">
                    <div className="country-message">

                <p
                  className={`form-title   ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  country
                </p>

                <p className="error">{formErrors.country}</p>
                    </div>
              </div>
                  <input
                    className={`county-in in ${darkMode ? "dark-input" : "light-input"}`}
                    type="text"
                    name="country"
                    value={invoiceData.country}
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

                <p className="error">{formErrors.clientEmail}</p>
                    </div>
              </div>
              <input
                className={` in ${darkMode ? "dark-input" : "light-input"}`}
                type="text"
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

                <p className="error">{formErrors.clientAddress}</p>
              </div>
              </div>
              <input
                className={` in ${darkMode ? "dark-input" : "light-input"}`}
                type="text"
                name="clientAddress"
                value={invoiceData.clientAddress}
                onChange={handleChange}
              />

              <div className="addresses">
                <div className="addresses-row">

                <div>
                <div className="form-title-section">
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
                    value={invoiceData.clientCity}
                    onChange={handleChange}
                    />
                </div>
                <div className="post">
                <div className="form-title-section">
                <p
                  className={`form-title ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                  >
                  post code
                </p>

                <p className="error">{formErrors.clientPost}</p>
              </div>
                  <input
                    className={`post-in in ${darkMode ? "dark-input" : "light-input"}`}
                    type="number"
                    name="clientPost"
                    value={invoiceData.clientPost}
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

                <p className="error">{formErrors.invoiceDate}</p>
              </div>
                  <input
                    className={`invoice-input in ${darkMode ? "dark-input" : "light-input"}`}
                    type="date"
                    name="invoiceDate"
                value={invoiceData.invoiceDate}
                onChange={handleChange}
                  />
                </div>
                <div>
                <div className="form-title-section">
                <p
                  className={`form-title ${
                    darkMode ? " dark-form-title" : "light-form-title"
                  }`}
                >
                  payment terms
                </p>
              </div>
              <div className={`select-items ${darkMode ? "dark-select-items ":" light-select-items"}`}>
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
                <div className="message">

                <p
                  className={`form-title ${
                      darkMode ? " dark-form-title" : "light-form-title"
                    }`}
                    >
                  project description
                </p>

                <p className="error">{formErrors.project}</p>
                    </div>
              </div>
                <input
                  className={`project-in in ${darkMode ? "dark-input" : "light-input"}`}
                  type="text"
                  name="project"
                value={invoiceData.project}
                onChange={handleChange}
                />
              </div>
            </div>
            <div>
             
              <button className={`item-btn ${darkMode ?"dark-item-btn": "light-item-btn"}`}>
                + add new item
              </button>
            </div>

          </form>
          <div className="error">
            <p>{formErrors.item}</p>
            <p>{formErrors.quantity}</p>
          </div>
        </div>
        <div className="edit-invoice-button">
          <div className="edit-button-section">
            <button
              className={`cancel-btn ${
                darkMode ? "dark-cancel-btn" : "light-cancel-btn"
              }`}
            >
              cancel
            </button>
            <button type="submit" className="save-btn">save changes</button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Edit;

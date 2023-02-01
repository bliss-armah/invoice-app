import React, { useEffect, useState } from "react";
import "./Edit.css";
import ArrowDown from "../../../public/assets/icon-arrow-down.svg"
import axios from "axios";
import { useParams } from "react-router-dom";
const Edit = ({ darkMode, goBack,invoiceDetails }) => {
  const {id} = useParams()
  
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

  const [formErrors, setFormErrors] = useState({});
  const [word, setWord] = useState("Net 30 Days");
  const [isClicked, setIsClicked] = useState(false);
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
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  // Items Section
  const [items, setItems] = useState([
    { id: 1, name: "", quantity: "", price: "" },
  ]);

  const itemHandleChange = (e, id) => {
    console.log(e.target.name)
    const invoiceItemCurrent = { ...invoiceItemsVals[id] };
    invoiceItemCurrent[e.target.name] = e.target.value;
    setInvoiceItemVals({ 
      ...invoiceItemsVals, 
      [id]: invoiceItemCurrent
    });
  } 

  useEffect(() => {
    console.log(invoiceItemsVals)
  }, [invoiceItemsVals])


  const itemHandleDeleteChange = (id) => {
    console.log(invoiceItemsVals)
    console.log(id);
    const filteredInvoiceItems = Object.keys(invoiceItemsVals).filter((elt) => elt !== id);
    console.log(filteredInvoiceItems)
    const dataObj = {};
    filteredInvoiceItems.forEach((elt) => dataObj[elt] = invoiceItemsVals[elt]);
    setInvoiceItemVals(dataObj);
  }

  const handleAddItem = (e) => {
    e.preventDefault();
    console.log(invoiceItemsVals)
    const newId = Object.keys(invoiceItemsVals).length;
    console.log(invoiceItemsVals)
    setInvoiceItemVals({
      ...invoiceItemsVals,
      [newId]: { name: "", quantity: 0, price: 0.0 }
    });
  };

  const validateItems = (elt) => {
    const [name, quantity, price] = Object.values(elt);
    return (name !== '') && (quantity > 0) && (price > 0.0);
  }

  
  const validate = (values,invoiceItemsVals) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      if (Object.values(values).every((elt) => elt !== '')) {
        return false;
      }
  
  
      if (!values.clientEmail) {
        errors.clientEmail = "Can't be empty";
      } else if (!regex.test(values.clientEmail)) {
        errors.email = "This is not a valid email";
      }
  
      if (Object.keys(invoiceItemsVals).length > 0){
        if (!(Object.values(invoiceItemsVals).every((elt) => validateItems(elt) === true))) return false;
      } else {
        errors.items = "Can't be empty";
      }
    if (!values.senderStreet) {
      errors.senderStreet = "Can't be empty";
    }
    if (!values.clientStreet) {
        errors.clientStreet = "Can't be empty";
      }
      if (!values.senderCity) {
        errors.senderCity = "Can't be empty";
      }
      if (!values.clientCity) {
        errors.clientCity = "Can't be empty";
      }
      if (!values.senderCountry) {
        errors.senderCountry = "Can't be empty";
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
    if (!values.senderPostCode) {
      errors.senderPostCode = "Can't be empty";
    } 
    if (!values.clientPostCode) {
        errors.clientPostCode = "Can't be empty";
      } 
      if (!values.description) {
          errors.description = "Can't be empty";
        }
    return errors;
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(invoiceData, invoiceItemsVals));
    if (validate(invoiceData, invoiceItemsVals)) {
      setInvoiceData(initialData);
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
    } else {
      console.log('Error occurred')
    }
  };


  // const [invoiceData, setInvoiceData] = useState({
  //   address:"",
  //   city: "",
  //   post: "",
  //   country: "",
  //   clientName: hold.clientName,
  //   clientEmail: hold.clientEmail,
  //   clientAddress: "",
  //   clientCity: "",
  //   clientPost: "",
  //   clientCountry: "",
  //   invoiceDate: hold.createdAt,
  //   project:hold.description, 
  //   item:"",
  //   quantity:0,
  //   price:0.00,

    
  // });


  // const [formErrors, setFormErrors] = useState({});
  // const [word,setWord] = useState('Net 30 Days')
  // const [isClicked,setIsClicked] = useState(false)

 

  // const handleClick= () =>{
  //   setIsClicked(!isClicked)
  // }

  // const changeValue = (value) =>{
  //   setWord(value)
  //   setIsClicked(!isClicked)

  // }

  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setInvoiceData({ ...invoiceData, [name]: value });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate(invoiceData));
  //   if (
  //     invoiceData.address&&
  //     invoiceData.city &&
  //     invoiceData.post &&
  //     invoiceData.country &&
  //     invoiceData.clientName &&
  //     invoiceData.clientEmail &&
  //     invoiceData.clientAddress &&
  //     invoiceData.clientCity &&
  //     invoiceData.clientPost &&
  //     invoiceData.clientCountry &&
  //     invoiceData.invoiceDate &&
  //     invoiceData.project &&
  //     invoiceData.item &&
  //     invoiceData.quantity &&
  //     invoiceData.price
  //   ) {
  //     setInvoiceData({
  //       city: "",
  //       address:"",
  //       post: "",
  //       country: "",
  //       clientName: "",
  //       clientEmail: "",
  //       clientAddress: "",
  //       clientCity: "",
  //       clientPost: "",
  //       clientCountry: "",
  //       invoiceDate:"",
  //       project:"",
  //       item:"",
  //       quantity:0,
  //       price:0.00
  //     });
  //     axios.patch(`https://invoice-api-9l7b.onrender.com/invoice/${id}`,{
  //       address:invoiceData.address,
  //       city:invoiceData.city,
  //       post:invoiceData.post,
  //       country:invoiceData.country,
  //       clientName:invoiceData.clientName,
  //       clientEmail:invoiceData.clientEmail,
  //       clientAddress:invoiceData.clientAddress,
  //       clientCity:invoiceData.clientCity,
  //       clientPost:invoiceData.clientPost,
  //       clientCountry:invoiceData.clientCountry,
  //       invoiceDate:invoiceData.invoiceDate,
  //       project:invoiceData.project,
  //       item:invoiceData.item,
  //       quantity:invoiceData.quantity,
  //       price:invoiceData.price
  //     }).then(res => console.log(res)).catch(err => console.log(err))
  //   }
  //   }
    

  // const validate = (values) => {
  //   const errors = {};
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  //   const phoneRegex =
  //     /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  //   if (!values.address) {
  //     errors.address = "Can't be empty";
  //   }
  //   if (!values.clientAddress) {
  //       errors.clientAddress = "Can't be empty";
  //     }
  //     if (!values.city) {
  //       errors.city = "Can't be empty";
  //     }
  //     if (!values.clientCity) {
  //       errors.clientCity = "Can't be empty";
  //     }
  //     if (!values.country) {
  //       errors.country = "Can't be empty";
  //     }
  //     if (!values.clientCountry) {
  //       errors.clientCountry = "Can't be empty";
  //     }
  //     if (!values.clientName) {
  //       errors.clientName = "Can't be empty";
  //     }
  //   if (!values.clientEmail) {
  //     errors.clientEmail = "Can't be empty";
  //   } else if (!regex.test(values.clientEmail)) {
  //     errors.email = "This is not a valid email";
  //   }
  //   if (!values.post) {
  //     errors.post = "Can't be empty";
  //   } 
  //   if (!values.clientPost) {
  //       errors.clientPost = "Can't be empty";
  //     } 
  //   if (!values.invoiceDate) {
  //       errors.invoiceDate = "Can't be empty";
  //     } 
      
  //     if (!values.project) {
  //         errors.project = "Can't be empty";
  //       }
  //       if (!values.item && !values.quantity && !values.price) {
  //         errors.item = "-All fields must be added";
  //         errors.quantity = "-An item must be added"
  //       } 
      
       
  //   return errors;
  // };
  return (
    <main className="all">
      <form
        className={`section ${
          darkMode ? "dark-section " : "light-section"
        }`}
        onSubmit={handleSubmit}
      >
        <div className="form-contents">
          <div className="go-back-button">
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
                value={invoiceDetails.senderStreet}
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

                <p className="error">{formErrors.senderCity}</p>
                    </div>
              </div>
                  <input
                    className={`city-in in ${darkMode ? "dark-input" : "light-input"}`}
                    type="text"
                    name="senderCity"
                    value={invoiceDetails.senderCity}
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

                <p className="error">{formErrors.senderPostCode}</p>
              </div>
                  <input
                    className={`post-in in ${darkMode ? "dark-input" : "light-input"}`}
                    type="number"
                    name="senderPostCode"
                    value={invoiceDetails.senderPostCode}
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

                <p className="error">{formErrors.senderCountry}</p>
                    </div>
              </div>
                  <input
                    className={`county-in in ${darkMode ? "dark-input" : "light-input"}`}
                    type="text"
                    name="senderCountry"
                    value={invoiceDetails.senderCountry}
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
                value={invoiceDetails.clientName}
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
                value={invoiceDetails.clientEmail}
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
                value={invoiceData.clientStreet}
                onChange={handleChange}
              />

              <div className="addresses">
                <div className="addresses-row">

                <div className="city">
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

                <p className="error">{formErrors.clientPostCode}</p>
              </div>
                  <input
                    className={`post-in in ${darkMode ? "dark-input" : "light-input"}`}
                    type="number"
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

                <p className="error">{formErrors.description}</p>
                    </div>
              </div>
                <input
                  className={`project-in in ${darkMode ? "dark-input" : "light-input"}`}
                  type="text"
                  name="description"
                value={invoiceData.description}
                onChange={handleChange}
                />
              </div>
            </div>
            <div>
             <div className="item-section">
             <h2 className=" items-title">Item List</h2>

<div className=" items-content">
  <table>
    <thead>
      <tr>
        <th>
          {" "}
          <label className={`${darkMode ? "label-dark" : ""}`}>
            Item Name
          </label>{" "}
        </th>
        <th>
          {" "}
          <label className={`${darkMode ? "label-dark" : ""}`}>
            Qty.
          </label>{" "}
        </th>
        <th>
          {" "}
          <label className={`${darkMode ? "label-dark" : ""}`}>
            Price
          </label>{" "}
        </th>
        <th>
          {" "}
          <label className={`${darkMode ? "label-dark" : ""}`}>
            Total
          </label>{" "}
        </th>
      </tr>
    </thead>
    {Object.keys(invoiceItemsVals).map((item) => 
      <tbody key={item}>
      <tr>
        <td>
            {" "}
            <input
            className={`item-name ${
                darkMode ? "input-select-dark " : ""
            }`}
            key={item}
            type="text"
            name="name"
            // value={item.name}
            // value={item.name}
            // onChange={handleChange}
            onChange={(event) =>
                itemHandleChange(event, item)
            }
            />{" "}
        </td>
        <td>
            {" "}
            <input
            className={`item-quantity ${
                darkMode ? "input-select-dark " : ""
            }`}
            type="number"
            min="0"
            //   name="itemQuantity"
            name="quantity"
            //   value={invoiceData.itemQuantity}
            // value={item.quantity}
            // onChange={handleChange}
            onChange={(event) =>
                itemHandleChange(event, item)
            }
            />{" "}
        </td>
        {/* <td value={item.price}> */}
        <td>
            {" "}
            <input
            className={`item-price ${
                darkMode ? "input-select-dark " : ""
            }`}
            type="number"
            min="0"
            //   name="itemPrice"
            name="price"
            //   value={invoiceData.itemPrice}
            // value={item.price}
            // onChange={handleChange}
            onChange={(event) =>
                itemHandleChange(event, item)
            }
            />
        </td>
        {/* <td value={item.total} className="item-total"> */}
        <td className="item-total">

            <p
            className="price"
            // value={invoiceData.itemTotal}
            // value={item.total}
            >
            123
            </p>

            <div
            className="item-delete-svg"
            onClick={() => itemHandleDeleteChange(item)}
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
        </td>
      </tr>
    </tbody>
    
    )}
  </table>
</div>
              <button onClick={handleAddItem} className={`item-btn ${darkMode ?"dark-item-btn": "light-item-btn"}`}>
                + add new item
              </button>
             </div>
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

import { useEffect, useState } from "react";
import "./CreateInvoice.css";
import ArrowDown from "../../../public/assets/icon-arrow-down.svg";
import axios from "axios";
import "./AddItems.css";

const CreateInvoice = ({ darkMode, back, goBack }) => {
  const randomIdGenerator = () => {
    let randomPassword;
    const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomTwoLetter =
      letter[Math.trunc(Math.random() * 26)] +
      letter[Math.trunc(Math.random() * 26)];
    return (randomPassword =
      randomTwoLetter + Math.trunc(Math.random() * 9999 + 1));
  };

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
    paymentDue: "",
    description: "",
  };

  const [invoiceData, setInvoiceData] = useState(initialData);

  const [invoiceItemsVals, setInvoiceItemVals] = useState({});
  const [total, setTotal] = useState({});
  const [grandTotal, setGrandTotal] = useState(0)
  const [formErrors, setFormErrors] = useState({});
  const [fieldsError, setFieldsError] = useState("");
  const [itemsError, setItemsError] = useState("");
  const [word, setWord] = useState("Net 30 Days");
  const [isClicked, setIsClicked] = useState(false);
  const [saveClicked, setSaveClicked] = useState(false);
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
      [newId]: { name: "", quantity: 0, price: 0.0 },
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
    if (Object.keys(invoiceItemsVals).length < 1) {
      setFieldsError("An item must be added");
    } else {
      setItemsError([""]);
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
    setTotal(totalProductObj);


  }, [invoiceItemsVals]);


  const SubmitWithoutValidation = (e) => {
    e.preventDefault();
    const addedPriceToItems = {};
    Object.keys(invoiceItemsVals).forEach((elt) => {
      const obj = { ...invoiceItemsVals[elt] };
      obj["total"] = total[elt];
      addedPriceToItems[elt] = obj;
    });

    setInvoiceData({
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
      paymentDue: "",
      description: "",
      items: Object.values(addedPriceToItems),
    });
    axios
      .senderPostCode("https://invoice-api-9l7b.onrender.com/invoice", {
        id: randomIdGenerator(),
        status: "draft",
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
        createdAt: invoiceData.createdAt,
        paymentDue: invoiceData.paymentDue,
        description: invoiceData.description,
        items: Object.values(addedPriceToItems),
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const validateItems = (elt) => {
    const [name, quantity, price] = Object.values(elt);
    return name !== "" && quantity > 0 && price > 0.0;
  };

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

  const sendData = (invoiceData, invoiceItemsVals) => {
    setInvoiceData(initialData);
    const addedPriceToItems = {};
    Object.keys(invoiceItemsVals).forEach((elt) => {
      const obj = { ...invoiceItemsVals[elt] };
      obj["total"] = total[elt];
      addedPriceToItems[elt] = obj;
    });
    axios
      .post("https://invoice-api-9l7b.onrender.com/invoice", {
        id: randomIdGenerator(),
        status: "pending",
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
        paymentDue: invoiceData.paymentDue,
        createdAt: invoiceData.createdAt,
        description: invoiceData.description,
        items: Object.values(addedPriceToItems),
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validate(invoiceData, invoiceItemsVals);
  };

  return (
    <article className={` ${back ? "hidden" : ""} createInvoiceContainer`}>
      <form
        className={`createInvoiceContent ${
          darkMode ? "createInvoiceContent-dark" : "createInvoiceContent-light"
        }`}
      >
        <section className="formContent">
          <div
            onClick={goBack}
            className={`goBack ${darkMode ? "goBack-dark" : ""} `}
          >
            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.342.886L2.114 5.114l4.228 4.228"
                stroke="#9277FF"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
            Go back
          </div>

          <h2
            className={`formHeading ${
              darkMode ? "formHeading-dark" : "formHeading-light"
            }`}
          >
            New Invoice
          </h2>
          <div
            action=""
            className={`formSection ${
              darkMode ? "formSection-dark" : "formSection-light"
            }`}
          >
            <section className="billFromContainer">
              <h4 className="billFrom">Bill From</h4>
              <div className="wrapper street-address">
                <div className="title-error">
                  <label
                    className={`_label ${darkMode ? "labelDark " : ""} ${
                      formErrors.senderStreet ? "error-label" : ""
                    } `}
                  >
                    Street Address
                  </label>
                  <label className="error-message">
                    {formErrors.senderStreet}
                  </label>
                </div>
                <input
                  className={`_input ${darkMode ? "inputSelectDark " : ""} ${
                    formErrors.senderStreet ? "error-input" : ""
                  }`}
                  type="text"
                  name="senderStreet"
                  value={invoiceData.senderStreet}
                  onChange={handleChange}
                />
              </div>
              <div className="cityPostCountry">
                <div className="wrapper _city">
                  <div className="title-error">
                    <label
                      className={`_label ${darkMode ? "labelDark " : ""} ${
                        formErrors.senderCity ? "error-label" : ""
                      }`}
                    >
                      City
                    </label>
                    <label className="error-message">
                      {formErrors.senderCity}
                    </label>
                  </div>
                  <input
                    className={`_input ${darkMode ? "inputSelectDark " : ""} ${
                      formErrors.senderCity ? "error-input" : ""
                    }`}
                    type="text"
                    name="senderCity"
                    value={invoiceData.senderCity}
                    onChange={handleChange}
                  />
                </div>
                <div className="wrapper postCode">
                  <div className="title-error">
                    <label
                      className={`_label ${darkMode ? "labelDark " : ""} ${
                        formErrors.senderPostCode ? "error-label" : ""
                      }`}
                    >
                      Post Code
                    </label>
                    <label className="error-message">
                      {formErrors.senderPostCode}
                    </label>
                  </div>
                  <input
                    style={{ textTransform: "uppercase" }}
                    className={`_input ${darkMode ? "inputSelectDark " : ""} ${
                      formErrors.senderPostCode ? "error-input" : ""
                    }`}
                    type="text"
                    name="senderPostCode"
                    maxLength="5"
                    value={invoiceData.senderPostCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="wrapper _country">
                  <div className="title-error">
                    <label
                      className={`_label ${darkMode ? "labelDark " : ""} ${
                        formErrors.senderCountry ? "error-label" : ""
                      }`}
                    >
                      Country
                    </label>
                    <label className="error-message">
                      {formErrors.senderCountry}
                    </label>
                  </div>
                  <input
                    className={`_input ${darkMode ? "inputSelectDark " : ""} ${
                      formErrors.senderCountry ? "error-input" : ""
                    }`}
                    type="text"
                    name="senderCountry"
                    value={invoiceData.senderCountry}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>
            <section className="billToSection">
              <h4 className="billTo">Bill To</h4>
              <div className="wrapper client-name">
                <div className="title-error">
                  <label
                    className={`_label ${darkMode ? "labelDark " : ""} ${
                      formErrors.clientName ? "error-label" : ""
                    }`}
                    htmlFor=""
                  >
                    Client's Name
                  </label>
                  <label className="error-message">
                    {formErrors.clientName}
                  </label>
                </div>
                <input
                  className={`_input ${darkMode ? "inputSelectDark " : ""} ${
                    formErrors.clientName ? "error-input" : ""
                  }`}
                  type="text"
                  name="clientName"
                  value={invoiceData.clientName}
                  onChange={handleChange}
                />
              </div>
              <div className="wrapper client-email">
                <div className="title-error">
                  <label
                    className={`_label ${darkMode ? "labelDark " : ""} ${
                      formErrors.clientEmail ? "error-label" : ""
                    }`}
                    htmlFor=""
                  >
                    Client's Email
                  </label>
                  <label className="error-message">
                    {formErrors.clientEmail}
                  </label>
                </div>
                <input
                  className={`_input ${darkMode ? "inputSelectDark " : ""} ${
                    formErrors.clientEmail ? "error-input" : ""
                  }`}
                  type="email"
                  name="clientEmail"
                  value={invoiceData.clientEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="wrapper client-address">
                <div className="title-error">
                  <label
                    className={`_label ${darkMode ? "labelDark " : ""} ${
                      formErrors.clientStreet ? "error-label" : ""
                    }`}
                    htmlFor=""
                  >
                    Street Address
                  </label>
                  <label className="error-message">
                    {formErrors.clientStreet}
                  </label>
                </div>
                <input
                  className={`_input ${darkMode ? "inputSelectDark " : ""} ${
                    formErrors.clientStreet ? "error-input" : ""
                  }`}
                  type="text"
                  name="clientStreet"
                  value={invoiceData.clientStreet}
                  onChange={handleChange}
                />
              </div>
              <div className="cityPostCountry">
                <div className="wrapper _city">
                  <div className="title-error">
                    <label
                      className={`_label ${darkMode ? "labelDark " : ""} ${
                        formErrors.clientCity ? "error-label" : ""
                      }`}
                    >
                      City
                    </label>
                    <label className="error-message">
                      {formErrors.clientCity}
                    </label>
                  </div>
                  <input
                    className={`_input ${darkMode ? "inputSelectDark " : ""} ${
                      formErrors.clientCity ? "error-input" : ""
                    }`}
                    type="text"
                    name="clientCity"
                    value={invoiceData.clientCity}
                    onChange={handleChange}
                  />
                </div>
                <div className="wrapper postCode">
                  <div className="title-error">
                    <label
                      className={`_label ${darkMode ? "labelDark " : ""} ${
                        formErrors.clientPostCode ? "error-label" : ""
                      }`}
                    >
                      Post Code
                    </label>
                    <label className="error-message">
                      {formErrors.senderPostCode}
                    </label>
                  </div>
                  <input
                    style={{ textTransform: "uppercase" }}
                    className={`_input ${darkMode ? "inputSelectDark " : ""} ${
                      formErrors.clientPostCode ? "error-input" : ""
                    }`}
                    type="text"
                    name="clientPostCode"
                    value={invoiceData.clientPostCode}
                    onChange={handleChange}
                    maxLength="5"
                  />
                </div>
                <div className="wrapper _country">
                  <div className="title-error">
                    <label
                      className={`_label ${darkMode ? "labelDark " : ""} ${
                        formErrors.clientCountry ? "error-label" : ""
                      }`}
                    >
                      Country
                    </label>
                    <label className="error-message">
                      {formErrors.clientCountry}
                    </label>
                  </div>
                  <input
                    className={`_input ${darkMode ? "inputSelectDark " : ""} ${
                      formErrors.clientCountry ? "error-input" : ""
                    }`}
                    type="text"
                    name="clientCountry"
                    value={invoiceData.clientCountry}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="dateSection">
                <div className="wrapper invoice-date">
                  <div className="title-error">
                    <label
                      className={`_label ${darkMode ? "labelDark " : ""} ${
                        formErrors.createdAt ? "error-label" : ""
                      }`}
                      htmlFor=""
                    >
                      Invoice Date
                    </label>
                    <label className="error-message">
                      {formErrors.createdAt}
                    </label>
                  </div>
                  <input
                    id="date"
                    className={`_input date-input ${
                      darkMode ? "inputSelectDark " : ""
                    } ${formErrors.createdAt ? "error-input" : ""}`}
                    type="date"
                    name="createdAt"
                    value={invoiceData.createdAt}
                    onChange={handleChange}
                  />
                </div>

                <div className="wrapper payment-terms">
                  <div className="title-error">
                    <label
                      className={`_label ${darkMode ? "labelDark " : ""}`}
                      htmlFor=""
                    >
                      Payment Terms
                    </label>
                  </div>

                  <div
                    className={`paymentSelect ${
                      darkMode ? "dark-paymentSelect " : " light-paymentSelect"
                    }`}
                  >
                    <div
                      className="payment-paymentSelect"
                      onClick={handleClick}
                    >
                      <p> {word}</p>
                      <div
                        className={`arrow ${isClicked ? "arrow-rotate" : ""}`}
                      >
                        <img src={ArrowDown} alt={ArrowDown} />
                      </div>
                    </div>
                    {isClicked && (
                      <div
                        className={`paymentOptions ${
                          darkMode
                            ? "dark-paymentOptions "
                            : " light-paymentOptions"
                        }`}
                      >
                        <h6 onClick={() => changeValue("Net 1 day")}>
                          Net 1 day
                        </h6>
                        <div
                          className={`hr ${darkMode ? "dark-hr" : "light-hr"}`}
                        ></div>
                        <h6 onClick={() => changeValue("Net 7 days")}>
                          Net 7 days
                        </h6>
                        <div
                          className={`hr ${darkMode ? "dark-hr" : "light-hr"}`}
                        ></div>
                        <h6 onClick={() => changeValue("Net 14 days")}>
                          Net 14 days
                        </h6>
                        <div
                          className={`hr ${darkMode ? "dark-hr" : "light-hr"}`}
                        ></div>
                        <h6 onClick={() => changeValue("Net 30 days")}>
                          Net 30 days
                        </h6>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="wrapper project-description">
                <div className="title-error">
                  <label
                    className={`_label ${darkMode ? "labelDark " : ""} ${
                      formErrors.description ? "error-label" : ""
                    }`}
                  >
                    Project Description
                  </label>
                  <label className="error-message">
                    {formErrors.description}
                  </label>
                </div>
                <input
                  className={`_input ${darkMode ? "inputSelectDark " : ""} ${
                    formErrors.description ? "error-input" : ""
                  }`}
                  type="text"
                  name="description"
                  value={invoiceData.description}
                  onChange={handleChange}
                />
              </div>
            </section>
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
                      className={`_input item-name ${
                        darkMode ? "inputSelectDark " : ""
                      }`}
                      type="text"
                      name="name"
                      onChange={(event) => itemHandleChange(event, item)}
                    />
                  </div>
                  <div className="item-quantity">
                    <label
                      key={item}
                      className={`_label ${darkMode ? "labelDark " : ""}  ${
                        item > 0 ? "hide-title" : "display-title"
                      }`}
                    >
                      Qty.
                    </label>
                    <input
                      className={`_input item-quantity ${
                        darkMode ? "inputSelectDark " : ""
                      }`}
                      type="number"
                      min="0"
                      name="quantity"
                      onChange={(event) => itemHandleChange(event, item)}
                    />
                  </div>

                  <div className="item-price">
                    <label
                      key={item}
                      className={`_label ${darkMode ? "labelDark " : ""}  ${
                        item > 0 ? "hide-title" : "display-title"
                      }`}
                    >
                      Price
                    </label>
                    <input
                      className={`_input item-price ${
                        darkMode ? "inputSelectDark " : ""
                      }`}
                      type="number"
                      min="0"
                      name="price"
                      onChange={(event) => itemHandleChange(event, item)}
                    />
                  </div>

                  <div className="item-total-price">
                    <label
                      key={item}
                      className={`_label ${darkMode ? "labelDark " : ""}  ${
                        item > 0 ? "hide-title" : "display-title"
                      }`}
                    >
                      Total
                    </label>
                    <div
                      className={`total-price-down ${
                        item > 0 ? "total-price-down-desktop" : ""
                      }`}
                    >
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

              {/* <div style={{padding: '2rem', background: 'blue', color: 'white'}}>{grandTotal} 0</div> */}
              <button
                className={`add-item-button ${
                  darkMode ? "add-item-button-dark" : "add-item-button-light"
                }`}
                onClick={handleAddItem}
              >
                + Add New Item
              </button>
            </section>
            <div className="overlay"></div>
          </div>
        </section>

        <section
          className={`bottom-section ${
            darkMode ? "bottom-section-dark" : "bottom-section-light"
          }`}
        >
          <div className="error">
            <p>- {fieldsError} </p>
            <p>- {itemsError} </p>
          </div>
          <div className="actionBtn">
            <button className="actionButton discard" onClick={goBack}>
              Discard
            </button>
            <div className="draft-send">
              <button
                type="button"
                onClick={SubmitWithoutValidation}
                className="actionButton draftBtn"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="actionButton sendBtn"
              >
                Save & Send
              </button>
            </div>
          </div>
        </section>
      </form>
    </article>
  );
};

export default CreateInvoice;

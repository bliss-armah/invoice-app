import { useState } from "react";
import "./CreateInvoice.css";
import ArrowDown from "../../../public/assets/icon-arrow-down.svg";
import axios from "axios";
// import AddItems from "../addItems/AddItems";
import "../addItems/addItems.css";

const CreateInvoice = ({ darkMode }) => {
  const randomIdGenerator = () => {
    let randomPassword;
    const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomTwoLetter =
      letter[Math.trunc(Math.random() * 26)] +
      letter[Math.trunc(Math.random() * 26)];
    return (randomPassword =
      randomTwoLetter + Math.trunc(Math.random() * 9999 + 1));
  };

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
    project: "",
    itemName: "",
    itemPrice: '',
    itemQuantity: '',
    itemTotal: '',
  });

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

  const handleAddItem = (e) => {
    e.preventDefault();
    const newId = items.length ? items[items.length - 1].id + 1 : 1;
    setItems([...items, { id: newId, name: "", quantity: "", price: "" }]);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    console.log(id);
  };

  const itemHandleChange = (event, id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, [event.target.name]: event.target.value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  // const validate = () => {
  //   let itemsError = false;
  //   const updatedItems = items.map((item) => {
  //     if (item.name === "" || item.quantity === "" || item.price === "") {
  //       itemsError = true;
  //       return { ...item, error: true };
  //     }
  //     return { ...item, error: false };
  //   });
  //   setItems(updatedItems);
  //   if (itemsError) {
  //     setFormErrors({ ...formErrors, items: '- An item must be added' });
  //   } else {
  //     setFormErrors({ ...formErrors, items: '' });
  //   }
  // };

  const SubmitWithoutValidation = (e) => {
    e.preventDefault();

    setInvoiceData({
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
      createdAt: "",
      project: "",
      itemName: "",
      itemPrice: "",
      itemQuantity: "",
      itemTotal: "",
    });
    axios
      .post("https://invoice-api-9l7b.onrender.com/invoice", {
        id: randomIdGenerator(),
        status: "draft",
        address: invoiceData.address,
        city: invoiceData.city,
        post: invoiceData.post,
        country: invoiceData.country,
        clientName: invoiceData.clientName,
        clientEmail: invoiceData.clientEmail,
        clientAddress: invoiceData.clientAddress,
        clientCity: invoiceData.clientCity,
        clientPost: invoiceData.clientPost,
        clientCountry: invoiceData.clientCountry,
        createdAt: invoiceData.createdAt,
        project: invoiceData.project,
        itemName: invoiceData.itemName,
        itemPrice: invoiceData.itemPrice,
        itemQuantity: invoiceData.itemQuantity,
        itemTotal: invoiceData.itemTotal,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(invoiceData));
    if (
      invoiceData.address &&
      invoiceData.city &&
      invoiceData.post &&
      invoiceData.country &&
      invoiceData.clientName &&
      invoiceData.clientEmail &&
      invoiceData.clientAddress &&
      invoiceData.clientCity &&
      invoiceData.clientPost &&
      invoiceData.clientCountry &&
      invoiceData.createdAt &&
      invoiceData.project &&
      invoiceData.itemName &&
      invoiceData.itemPrice &&
      invoiceData.itemQuantity &&
      invoiceData.itemTotal
    ) {
      setInvoiceData({
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
        createdAt: "",
        project: "",
        itemName: "",
        itemPrice: "",
        itemQuantity: "",
        itemTotal: "",
      });
      axios
        .post("https://invoice-api-9l7b.onrender.com/invoice", {
          id: randomIdGenerator(),
          status: "pending",
          address: invoiceData.address,
          city: invoiceData.city,
          post: invoiceData.post,
          country: invoiceData.country,
          clientName: invoiceData.clientName,
          clientEmail: invoiceData.clientEmail,
          clientAddress: invoiceData.clientAddress,
          clientCity: invoiceData.clientCity,
          clientPost: invoiceData.clientPost,
          clientCountry: invoiceData.clientCountry,
          createdAt: invoiceData.createdAt,
          project: invoiceData.project,
          itemName: invoiceData.itemName,
          itemPrice: invoiceData.itemPrice,
          itemQuantity: invoiceData.itemQuantity,
          itemTotal: invoiceData.itemTotal,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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
    if (!values.createdAt) {
      errors.createdAt = "Can't be empty";
    }

    if (!values.project) {
      errors.project = "Can't be empty";
    }

    // if (!items.name) {
    //   errors.
    // }

    return errors;
  };

  return (
    <main className={` ${back ? "hidden":""} create-invoice-container absolute bottom-0 left-0`}>
      <form
        // onSubmit={handleSubmit}
        className={`create-invoice-content ${
          darkMode
            ? "create-invoice-content-dark"
            : "create-invoice-content-light"
        }`}
      >
        <section className="form-content">
          <div onClick={goBack}
            className={`border go-back-button ${
              darkMode ? "go-back-button-dark" : ""
            } `}
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
            className={`form-heading ${
              darkMode ? "form-heading-dark" : "form-heading-light"
            }`}
          >
            New Invoice
          </h2>
          <div
            action=""
            className={`form ${darkMode ? "form-dark" : "form-light"}`}
          >
            {/* <label className={valid ? `label-${theme}` : `label-${theme} invalid-label`}> Label text</label> */}

            <section className="bill-from-container">
              <h4 className="bill-from">Bill From</h4>
              <div className="wrapper street-address">
                <div className="title-error">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Street Address
                  </label>
                  <label className="error-message">{formErrors.address}</label>
                </div>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                  name="address"
                  value={invoiceData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="city-post-country">
                <div className="wrapper city">
                  <div className="title-error">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      City
                    </label>
                    <label className="error-message">{formErrors.city}</label>
                  </div>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                    name="city"
                    value={invoiceData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="wrapper post-code">
                  <div className="title-error">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      Post Code
                    </label>
                    <label className="error-message">{formErrors.post}</label>
                  </div>
                  <input
                    style={{ textTransform: "uppercase" }}
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                    name="post"
                    maxLength="5"
                    value={invoiceData.post}
                    onChange={handleChange}
                  />
                </div>
                <div className="wrapper country">
                  <div className="title-error">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      Country
                    </label>
                    <label className="error-message">
                      {formErrors.country}
                    </label>
                  </div>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                    name="country"
                    value={invoiceData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>
            <section className="bill-to">
              <h4 className="bill-to">Bill To</h4>
              <div className="wrapper client-name">
                <div className="title-error">
                  <label
                    className={`${darkMode ? "label-dark" : ""}`}
                    htmlFor=""
                  >
                    Client's Name
                  </label>
                  <label className="error-message">
                    {formErrors.clientName}
                  </label>
                </div>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                  name="clientName"
                  value={invoiceData.clientName}
                  onChange={handleChange}
                />
              </div>
              <div className="wrapper client-email">
                <div className="title-error">
                  <label
                    className={`${darkMode ? "label-dark" : ""}`}
                    htmlFor=""
                  >
                    Client's Email
                  </label>
                  <label className="error-message">
                    {formErrors.clientEmail}
                  </label>
                </div>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                  name="clientEmail"
                  value={invoiceData.clientEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="wrapper client-address">
                <div className="title-error">
                  <label
                    className={`${darkMode ? "label-dark" : ""}`}
                    htmlFor=""
                  >
                    Street Address
                  </label>
                  <label className="error-message">{formErrors.clientAddress}</label>
                </div>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                  name="clientAddress"
                  value={invoiceData.clientAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="city-post-country">
                <div className="wrapper city">
                  <div className="title-error">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      City
                    </label>
                    <label className="error-message">{formErrors.clientCity}</label>
                  </div>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                    name="clientCity"
                    value={invoiceData.clientCity}
                    onChange={handleChange}
                  />
                </div>
                <div className="wrapper post-code">
                  <div className="title-error">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      Post Code
                    </label>
                    <label className="error-message">{formErrors.post}</label>
                  </div>
                  <input
                    style={{ textTransform: "uppercase" }}
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                    name="clientPost"
                    value={invoiceData.clientPost}
                    onChange={handleChange}
                  />
                </div>
                <div className="wrapper country">
                  <div className="title-error">
                    <label className={`${darkMode ? "label-dark" : ""}`}>
                      Country
                    </label>
                    <label className="error-message">
                      {formErrors.clientCountry}
                    </label>
                  </div>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                    name="clientCountry"
                    value={invoiceData.clientCountry}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="date-section">
                <div className="wrapper invoice-date">
                  <div className="title-error">
                    <label
                      className={`${darkMode ? "label-dark" : ""}`}
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
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="date"
                    name="createdAt"
                    value={invoiceData.createdAt}
                    onChange={handleChange}
                  />
                </div>

                <div className="wrapper payment-terms">
                  <div className="title-error">
                    <label
                      className={`${darkMode ? "label-dark" : ""}`}
                      htmlFor=""
                    >
                      Payment Terms
                    </label>
                  </div>

                  <div
                    className={`select ${
                      darkMode ? "dark-select " : " light-select"
                    }`}
                  >
                    <div className="main" onClick={handleClick}>
                      <p> {word}</p>
                      <div
                        className={`arrow ${isClicked ? "arrow-rotate" : ""}`}
                      >
                        <img src={ArrowDown} alt={ArrowDown} />
                      </div>
                    </div>
                    {isClicked && (
                      <div
                        className={`options ${
                          darkMode ? "dark-options " : " light-options"
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
                    htmlFor=""
                    className={`${darkMode ? "label-dark" : ""}`}
                  >
                    Project Description
                  </label>
                  <label className="error-message">{formErrors.project}</label>
                </div>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                  name="project"
                  value={invoiceData.project}
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* <AddItems
              darkMode={darkMode}
              formErrors={formErrors}
              setFormErrors={setFormErrors} /> */}

            <section className="items-section">
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
                  {items.map((item) => (
                    <tbody key={item.id}>
                      <tr>
                        <td value={item.name}>
                          {" "}
                          <input
                            className={`item-name ${
                              darkMode ? "input-select-dark " : ""
                            }`}
                            key={item.id}
                            type="text"
                            name="itemName"
                            value={invoiceData.itemName}
                            // value={item.name}
                            // onChange={handleChange}
                            onChange={(event) =>
                              itemHandleChange(event, item.id)
                            }
                          />{" "}
                        </td>
                        <td value={item.quantity}>
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
                            value={item.quantity}
                            // onChange={handleChange}
                            onChange={(event) =>
                              itemHandleChange(event, item.id)
                            }
                          />{" "}
                        </td>
                        <td value={item.price}>
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
                            value={item.price}
                            // onChange={handleChange}
                            onChange={(event) =>
                              itemHandleChange(event, item.id)
                            }
                          />
                        </td>
                        <td value={item.total} className="item-total">
                          <p
                            className="price"
                            // value={invoiceData.itemTotal}
                            value={item.total}
                          >
                            123.00
                          </p>

                          <div
                            className="item-delete-svg"
                            onClick={() => handleDeleteItem(item.id)}
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
                  ))}
                </table>
              </div>

              <button
                className={`add-item-button ${
                  darkMode ? "add-item-button-dark" : "add-item-button-light"
                }`}
                onClick={handleAddItem}
              >
                + Add New Item
              </button>
            </section>
          </div>
          <div className="error">
            <p>- All fields must be added</p>
            <p>- An item must be added</p>
          </div>
        </section>
        <section
          className={`bottom-section ${
            darkMode ? "bottom-section-dark" : "bottom-section-light"
          }`}
        >
          <div className="action-btn">
            <button className="button discard" onClick={goBack}>Discard</button>
            <div className="draft-send">
              <button
                type="button"
                onClick={SubmitWithoutValidation}
                className="button draft"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="button send"
              >
                Save & Send
              </button>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
};

export default CreateInvoice;

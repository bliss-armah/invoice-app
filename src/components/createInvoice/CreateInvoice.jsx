import "./CreateInvoice.css";

const CreateInvoice = ({ darkMode }) => {
  return (
    <main className="create-invoice-container absolute bottom-0 -left-7 z-10">
      <form
        className={`create-invoice-content ${
          darkMode
            ? "create-invoice-content-dark"
            : "create-invoice-content-light"
        }`}
      >
        <section className="form-content">
          <div className={`go-back-button ${darkMode ? 'go-back-button-dark' : ''}`}>
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
            <section className="bill-from-container">
              <h4 className="bill-from">Bill From</h4>
              <div className="wrapper street-address">
                <label className={`${darkMode ? "label-dark" : ""}`}>
                  Street Address
                </label>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                  name="Street Address"
                />
              </div>
              <div className="city-post-country">
                <div className="wrapper city">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    City
                  </label>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                  />
                </div>
                <div className="wrapper post-code">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Post Code
                  </label>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                  />
                </div>
                <div className="wrapper country">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Country
                  </label>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                  />
                </div>
              </div>
            </section>
            <section className="bill-to">
              <h4 className="bill-to">Bill To</h4>
              <div className="wrapper client-name">
                <label className={`${darkMode ? "label-dark" : ""}`} htmlFor="">
                  Client's Name
                </label>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                />
              </div>
              <div className="wrapper client-email">
                <label className={`${darkMode ? "label-dark" : ""}`} htmlFor="">
                  Client's Email
                </label>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                />
              </div>
              <div className="wrapper client-address">
                <label className={`${darkMode ? "label-dark" : ""}`} htmlFor="">
                  Street Address
                </label>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                />
              </div>
              <div className="city-post-country">
                <div className="wrapper city">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    City
                  </label>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                  />
                </div>
                <div className="wrapper post-code">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Post Code
                  </label>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                  />
                </div>
                <div className="wrapper country">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Country
                  </label>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                  />
                </div>
              </div>
              <div className="date-section">
                <div className="wrapper invoice-date">
                  <label
                    className={`${darkMode ? "label-dark" : ""}`}
                    htmlFor=""
                  >
                    Invoice Date
                  </label>
                  <input
                    id="date"
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="date"
                  />
                </div>
                <div className="wrapper payment-terms">
                  <label
                    className={`${darkMode ? "label-dark" : ""}`}
                    htmlFor=""
                  >
                    Payment Terms
                  </label>
                  <select
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    name=""
                    id=""
                  >
                    <option value="Net1Day">Net 1 Day</option>
                    <option value="Net7Day">Net 7 Days</option>
                    <option value="Net14Day">Net 14 Days</option>
                    <option value="Net30Days">Net 30 days</option>
                  </select>
                </div>
              </div>
              <div className="wrapper project-description">
                <label htmlFor="" className={`${darkMode ? "label-dark" : ""}`}>
                  Project Description
                </label>
                <input
                  className={`${darkMode ? "input-select-dark " : ""}`}
                  type="text"
                />
              </div>
            </section>
            <section className="items-section">
              <h2 className=" items-title">Item List</h2>
              <div className=" items-content">
                <div className="items-item item-name">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Item Name
                  </label>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                  />
                </div>
                <div className="items-item item-quantity">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Qty.
                  </label>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                  />
                </div>
                <div className="items-item item-price">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Price
                  </label>
                  <input
                    className={`${darkMode ? "input-select-dark " : ""}`}
                    type="text"
                  />
                </div>

                <div className="items-item item-total">
                  <label className={`${darkMode ? "label-dark" : ""}`}>
                    Total
                  </label>
                  <div className="item-total-content">
                    <p className="price">123.00</p>
                    <div className="item-total-content-svg">
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
              <button
                className={`add-item-button ${
                  darkMode ? "add-item-button-dark" : "add-item-button-light"
                }`}
              >
                + Add New Item
              </button>
            </section>
          </div>
          <p className="error">- All fields must be added</p>
        </section>
        <section
          className={`bottom-section ${
            darkMode ? "bottom-section-dark" : "bottom-section-light"
          }`}
        >
          <div className="action-btn">
            <button className="button discard">Discard</button>
            <div className="draft-send">
              <button className="button draft">Save as Draft</button>
              <button className="button send">Save & Send</button>
            </div>
          </div>
        </section>
      </form>
    </main>
  );
};

export default CreateInvoice;

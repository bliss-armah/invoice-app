import React from "react";
import "./Viewinvoice.css";

function Viewinvoice({ darkMode }) {
  return (
    <main
      className={`viewinvoice-container ${
        darkMode ? "viewinvoice-container-dark" : ""
      }`}
    >
      <article className="all-components">
        <div className="go-back cursor">
          <img src="../../public/assets/icon-arrow-left.svg" />
          <h4> Go back</h4>
        </div>
        <div
          className={`container-two ${darkMode ? "container-two-dark" : ""}`}
        >
          <div className="status-pending">
            <p className="status">Status</p>
            <div className="pending">
              <div className="pending-dot"></div>
              Pending
            </div>
          </div>

          <div className="buttons">
            <button className="edit cursor">Edit</button>
            <button className="delete cursor">Delete</button>
            <button className="paid cursor">Mark as Paid</button>
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
                <span>#</span>XM9141
              </h3>
              <div className="words-words">Graphic Design</div>
            </div>
            <div className="address">
              19 Union Terrace
              <br />
              London
              <br />
              E13EZ
              <br />
              United kingdom
            </div>
          </div>

          <div className="date-bill">
            <div className="invoice-date">
              <p>Invoice Date</p>
              <br />
              <h4>21 Aug 2021</h4>
            </div>
            <div className="due-date">
              <p>Payment Due</p>
              <br />
              <h4>20 Sep 2021</h4>
            </div>

            <div className="bill-to">
              <p>Bill To</p>
              <br />

              <h4>Alex Grim</h4>

              <br />

              <p>
                84 Church Way
                <br />
                Bradford
                <br />
                BD1 9PB
                <br />
                United Kingdom
              </p>
            </div>

            <div className="sent-to">
              <p>Sent to</p>
              <br />
              <h4>alexgrim@mail.com</h4>
            </div>
            </div>

            <section
              className={`container-quantity ${
                darkMode ? "container-quantity-dark" : ""
              }`}
            >
              <div className="quantity-items">
                <div className="names">Item Name</div>
                <div className="quantity">QTY.</div>
                <div className="price">Price</div>
                <div className="total">Total</div>
                
                <div className="banner">Banner Design</div>

                <div className="quantity-one">1</div>
                <div className="price-one">£ 156.00</div>
                <div className="total-one">£ 156.00</div>
                <div className="email">Email Design</div>
                <div className="quantity-two">2</div>
                <div className="price-two">£ 200.00</div>
                <div className="total-two">£ 400.00</div>
              </div>
            </section>


            <div className="blue-box">
              <div className="grand-total">Grand Total</div>
              <div className="amount">£ 556.00</div>
            </div>

            </div>
          
        </section>
        <div className="buttons small-show">
            <button className="edit cursor">Edit</button>
            <button className="delete cursor">Delete</button>
            <button className="paid cursor">Mark as Paid</button>
          </div>
      </article>
    </main>
  );
}

export default Viewinvoice;

import React from "react";
import "./Viewinvoice.css";

function Viewinvoice({darkMode}) {
  return (
    <div>
    <div className={`viewinvoice-container ${darkMode ? 'viewinvoice-container-dark' : ''}`}>
      <section className="all-components">
        <div className="go-back cursor" >
          <img src="../../public/assets/icon-arrow-left.svg" />
          <h4> Go back</h4>
        </div>

        <div>
      <div className={`container-two ${darkMode ? 'container-two-dark' : ''}`}>
        <div className="status-pending">
          <p>Status</p>
          <div className="pending">
            <div className="pending-dot"></div>
           Pending
          </div>
        </div>
  

        <section className="buttons">
          <button className="edit cursor">Edit</button>
          <button className="delete cursor">Delete</button>
          <button className="paid cursor">Mark as Paid</button>

            <section
              className={`container-three ${
                darkMode ? "container-three-dark" : ""
              }`}
            >
              <div className="section-center">
                <div className="design-address">
                  <div className="words">
                    <h3>
                      <span>#</span>XM9141{" "}
                    </h3>
                    <div className="words-words"> Graphic Design</div>
                  </div>
                  <div className="address">
                    19 Union Terrace
                    <br />
                    London
                    <br />
                    E13EZ
                    <br />
                    United Kingdom
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

              </div>
                <section className="down-section">
                  <section
                    className={`item-quantity ${
                      darkMode ? "item-quantity-dark" : ""
                    }`}
                  >
                    <div className="items-item item-quantity-name design">
                      <div className="warm">Item Name</div>
                      <div className="cool">
                        Banner Design <p>1 x £ 156.00</p>
                      </div>
                      <div className="cool ">
                        Email Design <p>2 x £ 200.00</p>
                      </div>
                    </div>
                    <div className="items-item item-quantity-qty">
                      <div className="warm">QTY.</div>
                      <div className="cold hot">1</div>
                      <div className="cold hot">2</div>
                    </div>
                    <div className="items-item item-quantity-price">
                      <div className="warm">Price</div>
                      <div className="cold swiss">£ 156.00</div>
                      <div className="cold swiss">£ 200.00</div>
                    </div>
                    <div className="items-item item-quantity-total">
                      <div className="warm">Total</div>
                      <div className="cool">£ 156.00</div>
                      <div className="cool">£ 400.00</div>
                    </div>
                  </section>

                  <div
                    className={`blue-box ${darkMode ? "blue-box-dark" : ""}`}
                  >
                    <div className="grand-total"> Grand Total</div>
                    <div className="amount">£ 556.00</div>
                  </div>
                </section>
            </section>
        </section>
      </div>

      <section className={`container-three ${darkMode ? 'container-three-dark' : ''}`}>
        
        <div className="section-center">
        <div className="design-address">
          <div className="words">
          <h3><span>#</span>XM9141 </h3>
          <div className="words-words"> Graphic Design</div>
          </div>
          <div className="address">
            19 Union Terrace
            <br />
            London
            <br />
            E13EZ
            <br />
            United Kingdom
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

    

      <section className={`item-quantity ${darkMode ? 'item-quantity-dark' : ''}`}>

        <div className="items-item item-quantity-name design">
          <div className="warm">Item Name</div>
          <div className="cool">Banner Design <p>1 x £ 156.00</p></div>
          <div className="cool ">Email Design <p>2 x £ 200.00</p></div>
        </div>
        <div className="items-item item-quantity-qty">
          <div className="warm">QTY.</div>
          <div className="cold hot">1</div>
          <div className="cold hot">2</div>
        </div>
        <div className="items-item item-quantity-price">
          <div className="warm">Price</div>
          <div className="cold swiss">£ 156.00</div>
          <div className="cold swiss">£ 200.00</div>
        </div>
        <div className="items-item item-quantity-total">
          <div className="warm">Total</div>
          <div className="cool">£ 156.00</div>
          <div className="cool">£ 400.00</div>
        </div>
      </section>


      <div className={`blue-box ${darkMode ? 'blue-box-dark' : ''}`}>
        <div className="grand-total"> Grand Total</div>
        <div className="amount">£ 556.00</div>
     
      </div>

      
      </div>
        
      </section>
      </div>
      
      </section>
      
    </div>
    
    <section className="buttons mobile-btn">
    <button className="edit cursor">Edit</button>
    <button className="delete cursor">Delete</button>
    <button className="paid cursor">Mark as Paid</button>
  </section>
    </div>
  );
}

export default Viewinvoice;

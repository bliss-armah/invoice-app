import React from "react";
import "./Viewinvoice.css";

function Viewinvoice() {
  return (
    <div className="viewinvoice-container">
      <section className="all-components">
        <div className="go-back">
          <img src="../../public/assets/icon-arrow-left.svg" />
          <h4> Go back</h4>
        </div>
      </section>

      <div className="container-two">
        <div className="status-pending">
          <p>Status</p>
          <div className="pending">
            <div className="pending-dot"></div>
           Pending
          </div>
        </div>

        <section className="buttons">
          <button className="edit">Edit</button>
          <button className="delete">Delete</button>
          <button className="paid">Mark as Paid</button>

        </section>
      </div>

      <section className="container-three">
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

      {/* date section */}
       <section className="date-address">
        <div className="date-one">
          <p>Invoice Date</p>
          <h4>21 Aug 2021</h4>
        </div>

        <div className="bill-to">
          <p>Bill To</p>
          <h4>Alex Grim</h4>
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
          <h4>alexgrim@mail.com</h4>
        </div>
      </section> 

      <div className="date-two">
        <p>Payment Due</p>
        <h4>20 Sep 2021</h4>
      </div>

      <section className="item-quantity">
        <div className="table-head">
          <div>Item Name</div>
          <div>QTY.</div>
          <div>Price</div>
          <div>Total</div>
        </div>
        <div className="table-data">
          <div>Banner Design</div>
          <div>1</div>
          <div>$1254</div>
          <div>$0569</div>
        </div>
        <div className="table-data-two">
        <div>Email Design</div>
          <div>2</div>
          <div>$1254</div>
          <div>$0569</div>
        </div>
      </section>

      
        
      </section>
    </div>
  );
}

export default Viewinvoice;

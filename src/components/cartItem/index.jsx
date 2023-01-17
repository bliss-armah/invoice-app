import React from 'react'
import './cart.css'
import bin from "../../../public/assets/icon-delete.svg"


const index = () => {
  return (
    <div>
        <h4 className='items-title'>Item List</h4>
         <div className="item">
            <div className="headings">
                <h5 className='form-title'>item name</h5>
                <h5 className='form-title'>qty.</h5>
                <h5 className='form-title'>price</h5>
                <h5 className=' form-title mag' >total</h5>
            </div>

            <div className="item-inputs">
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <div className="item-text">
                    <h4>156.00</h4>
                    <img src={bin} alt="" />
                </div>
            </div>
            <div className="item-inputs">
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <div className="item-text">
                    <h4>400.00</h4>
                    <img src={bin} alt="" />
                </div>
            </div>
            <button className='item-btn'>+ add new item</button>
        </div>
    </div>
  )
}

export default index
import React from 'react'
import './cart.css'


const index = ({darkMode}) => {
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
                <input className={`${ darkMode ? "dark-input" : "light-input"}`} type="text" />
                <input className={`${ darkMode ? "dark-input" : "light-input"}`} />
                <input className={`${ darkMode ? "dark-input" : "light-input"}`} />
                <div className="item-text">
                    <h4>156.00</h4>
                    <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z" fill="#888EB0" fill-rule="nonzero"/></svg>
                </div>
            </div>
            <div className="item-inputs">
                <input className={`${ darkMode ? "dark-input" : "light-input"}`} type="text" />
                <input className={`${ darkMode ? "dark-input" : "light-input"}`} type="text" />
                <input className={`${ darkMode ? "dark-input" : "light-input"}`} type="text" />
                <div className="item-text">
                    <h4>400.00</h4>
                    <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z" fill="#888EB0" fill-rule="nonzero"/></svg>
                </div>
            </div>
            <button className='item-btn dark-item-btn light-item-btn'>+ add new item</button>
        </div>
    </div>
  )
}

export default index
import React from 'react'
import './Edit.css'
import Cartitem from '../cartItem'

const Edit = ({darkMode}) => {
  return (
    <main>
        <section className={`container ${darkMode ? 'dark-container ' : 'light-container'}`}>
            <div className="form-content">

           
        <h4 className={`title ${darkMode ?'dark-title': 'light-title'}`}>Edit <span className='titleh'>#</span>XM9141</h4>
        <form className='form-container'>
        <div className="bill-form-container">
        <h4 className='form-title-head'>bill from</h4>
        <p className={`form-title ${darkMode ?' dark-form-title' : 'light-form-title'}`}>street address</p>
        <input className={`${ darkMode ? "dark-input" : "light-input"}`}  type="text"  />
        <div className="address">
            <div>
            <p className={`form-title ${darkMode ?' dark-form-title' : 'light-form-title'}`}>city</p>
        <input className={`${ darkMode ? "dark-input" : "light-input"}`} type="text"  />
            </div>
            <div>
            <p className={`form-title ${darkMode ?' dark-form-title' : 'light-form-title'}`}>post code</p>
        <input className={`${ darkMode ? "dark-input" : "light-input"}`} type="text"  />
            </div>
            <div>
            <p className={`form-title ${darkMode ?' dark-form-title' : 'light-form-title'}`}>country</p>
        <input className={`${ darkMode ? "dark-input" : "light-input"}`} type="text" />
            </div>
        </div>
        </div>
        <div className="bill-form-container">
        <h4 className='form-title-head'>bill from</h4>
        <p className={`form-title ${darkMode ?' dark-form-title' : 'light-form-title'}`}>client's name</p>
        <input className={`${ darkMode ? "dark-input" : "light-input"}`} type="text"  />
        <p className={`form-title ${darkMode ?' dark-form-title' : 'light-form-title'}`}>client's email</p>
        <input className={`${ darkMode ? "dark-input" : "light-input"}`} type="text"  />
        <p className={`form-title ${darkMode ?' dark-form-title' : 'light-form-title'}`}>street address</p>
        <input className={`${ darkMode ? "dark-input" : "light-input"}`} type="text"  />
        
        <div className="address">
            <div>
            <p className={`form-title ${darkMode ?' dark-form-title' : 'light-form-title'}`}>city</p>
        <input className={`${ darkMode ? "dark-input" : "light-input"}`} type="text"  />
            </div>
            <div>
            <p className={`form-title ${darkMode ?' dark-form-title' : 'light-form-title'}`}>post code</p>
        <input className={`${ darkMode ? "dark-input" : "light-input"}`} type="text"  />
            </div>
            <div>
            <p className={`form-title ${darkMode ?' dark-form-title' : 'light-form-title'}`}>country</p>
        <input className={`${ darkMode ? "dark-input" : "light-input"}`} type="text" />
            </div>
        </div>
        </div>
        <div className="invoice">
            <div className="invoice-row">
            <div>
        <p className={`form-title ${darkMode ?' dark-form-title' : 'light-form-title'}`}>invoice date</p>
        <input className={`${ darkMode ? "dark-input" : "light-input"}`} type="date" />
            </div>
            <div>
        <p className={`form-title ${darkMode ?' dark-form-title' : 'light-form-title'}`}>payment terms</p>
        <select className={`${darkMode?'dark-select': 'light-select'}`}>
  <option value="net 1 day">net 1 day</option>
  <option value="net 7 day">net 7 days</option>
  <option value="net 14 day">net 14 days</option>
  <option selected value="net 30 day">net 30 days</option>
</select>
            </div>
            </div>
           
            <div>
        <p className={`form-title ${darkMode ?' dark-form-title' : 'light-form-title'}`}>project description</p>
        <input className={`${ darkMode ? "dark-input" : "light-input"}`} type="text" />
            </div>
        </div>
        <Cartitem darkMode = {darkMode}/>       
        </form>
        <div className="edit-invoice-button">
            <div className="edit-button-container">
                <button className={`cancel-btn ${darkMode?'dark-cancel-btn' : 'light-cancel-btn'}`}>cancel</button>
                <button className='save-btn'>save changed</button>
            </div>
        </div>
        </div>
        </section>
    </main>
  )
}

export default Edit
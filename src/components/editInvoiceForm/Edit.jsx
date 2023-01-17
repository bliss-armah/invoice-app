import React from 'react'
import './Edit.css'
import Cartitem from '../cartItem'

const Edit = () => {
  return (
    <main>
        <section className="container">
            <div className="form-content">

           
        <h4 className='title'>Edit <span className='titleh'>#</span>XM9141</h4>
        <form className='form-container'>
        <div className="bill-form-container">
        <h4 className='form-title-head'>bill from</h4>
        <p className='form-title'>street address</p>
        <input type="text"  />
        <div className="address">
            <div>
            <p className='form-title'>city</p>
        <input type="text"  />
            </div>
            <div>
            <p className='form-title'>post code</p>
        <input type="text"  />
            </div>
            <div>
            <p className='form-title'>country</p>
        <input type="text" />
            </div>
        </div>
        </div>
        <div className="bill-form-container">
        <h4 className='form-title-head'>bill from</h4>
        <p className='form-title'>client's name</p>
        <input type="text"  />
        <p className='form-title'>client's email</p>
        <input type="text"  />
        <p className='form-title'>street address</p>
        <input type="text"  />
        
        <div className="address">
            <div>
            <p className='form-title'>city</p>
        <input type="text"  />
            </div>
            <div>
            <p className='form-title'>post code</p>
        <input type="text"  />
            </div>
            <div>
            <p className='form-title'>country</p>
        <input type="text" />
            </div>
        </div>
        </div>
        <div className="invoice">
            <div className="invoice-row">
            <div>
        <p className='form-title'>invoice date</p>
        <input type="date" />
            </div>
            <div>
        <p className='form-title'>payment terms</p>
        <select name="day" id="day">
  <option value="net 1 day">net 1 day</option>
  <option value="net 7 day">net 7 days</option>
  <option value="net 14 day">net 14 days</option>
  <option value="net 30 day">net 30 days</option>
</select>
            </div>
            </div>
           
            <div>
        <p className='form-title'>project description</p>
        <input type="text" />
            </div>
        </div>
        <Cartitem/>       

        </form>
        </div>
        </section>
    </main>
  )
}

export default Edit
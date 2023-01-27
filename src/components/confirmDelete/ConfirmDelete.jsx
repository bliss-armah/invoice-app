import './ConfirmDelete.css'
import { useParams, Link, useNavigate } from "react-router-dom";
import React,{useCallback} from 'react';
import axios from 'axios';


const ConfirmDelete = ({darkMode,goBack}) => {
  const navigate = useNavigate()
  const { id } = useParams();

  const Delete = () =>{
    // console.log(id);
  }

  const deleteInvoice = useCallback( async () => {
    const resData = await axios.delete(`https://invoice-api-9l7b.onrender.com/invoice/${id}`)
    navigate("/")
  },[id] )

  return (
    <section className='delete-modal'>
        <div className={`delete-container ${darkMode ? 'delete-container-dark' :'delete-container-light'}`}>
            <div className="delete-content">
              <p className={`heading ${darkMode ? 'heading-dark' : 'heading-light'}`}>Confirm Deletion</p>
              <p className={`delete-paragraph ${darkMode ? 'delete-paragraph-dark' : 'delete-paragraph-light'}`}>
              Are you sure you want to delete invoice #{id}? This action cannot be undone.
              </p>
              <div className="cancel-delete-btn">
                <button className={`confirm-button ${darkMode ? 'cancel-btn-dark' : 'cancel-btn-light'}`} onClick={goBack}>Cancel</button>
                <button className="confirm-button delete-btn" onClick={deleteInvoice}>Delete</button>
              </div>
            </div>
        </div>
    </section>
  )
}

export default ConfirmDelete
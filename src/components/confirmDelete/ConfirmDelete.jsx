import "./ConfirmDelete.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteInvoice } from "../../invoiceSlice/InvoiceSlice";

const ConfirmDelete = ({ goBack }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.invoice.isDarkMode);

  const navigate = useNavigate();
  const { id } = useParams();


  // const url = 'https://invoice-api-9l7b.onrender.com/invoice/'

  const handleDelete =() => {
    dispatch(deleteInvoice(id))
    navigate('/')
  };

  return (
    <section className="delete-modal">
      <div
        className={`delete-container ${
          darkMode ? "delete-container-dark" : "delete-container-light"
        }`}
      >
        <div className="delete-content">
          <p
            className={`heading ${darkMode ? "heading-dark" : "heading-light"}`}
          >
            Confirm Deletion
          </p>
          <p
            className={`delete-paragraph ${
              darkMode ? "delete-paragraph-dark" : "delete-paragraph-light"
            }`}
          >
            Are you sure you want to delete invoice #{id}? This action cannot be
            undone.
          </p>
          <div className="cancel-delete-btn">
            <button
              className={`confirm-button ${
                darkMode ? "cancel-btn-dark" : "cancel-btn-light"
              }`}
              onClick={goBack}
            >
              Cancel
            </button>
            <button
              className="confirm-button delete-btn"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmDelete;

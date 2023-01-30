


function AddInvoiceItems({ item }) {
    return ( 
        <tbody key={item.id}>
            <tr>
            <td value={item.name}>
                {" "}
                <input
                className={`item-name ${
                    darkMode ? "input-select-dark " : ""
                }`}
                key={item.id}
                type="text"
                name="name"
                value={item.name}
                // value={item.name}
                // onChange={handleChange}
                onChange={(event) =>
                    itemHandleChange(event, item.id)
                }
                />{" "}
            </td>
            <td value={item.quantity}>
                {" "}
                <input
                className={`item-quantity ${
                    darkMode ? "input-select-dark " : ""
                }`}
                type="number"
                min="0"
                //   name="itemQuantity"
                name="quantity"
                //   value={invoiceData.itemQuantity}
                value={item.quantity}
                // onChange={handleChange}
                onChange={(event) =>
                    itemHandleChange(event, item.id)
                }
                />{" "}
            </td>
            <td value={item.price}>
                {" "}
                <input
                className={`item-price ${
                    darkMode ? "input-select-dark " : ""
                }`}
                type="number"
                min="0"
                //   name="itemPrice"
                name="price"
                //   value={invoiceData.itemPrice}
                value={item.price}
                // onChange={handleChange}
                onChange={(event) =>
                    itemHandleChange(event, item.id)
                }
                />
            </td>
            <td value={item.total} className="item-total">
                <p
                className="price"
                // value={invoiceData.itemTotal}
                value={item.total}
                >
                123.00
                </p>

                <div
                className="item-delete-svg"
                onClick={() => handleDeleteItem(item.id)}
                >
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
            </td>
            </tr>
        </tbody>
    );
}

export default AddInvoiceItems;
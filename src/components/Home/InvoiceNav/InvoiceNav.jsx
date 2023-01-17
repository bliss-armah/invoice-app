import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { faAngleUp } from "@fortawesome/free-solid-svg-icons"
import invoiceData from "../../../data.json"
import Filter from "./Filter"
import { useState } from "react"



const InvoiceNav = () => {
    const [toggle, setToggle] = useState(false)

    const handleClickEvent = () => {
        setToggle(prevState => !prevState)
    }
    const totalInvoice = invoiceData.length

    return (
        <div className="flex tracking-wide justify-between items-center font-bold font-spartan">
            <div className="flex justify-between w-8/12">
                <div>
                    <h1 className="text-xl">Invoices</h1>
                    <p className="text-light-gray text-sm">{totalInvoice} invoices</p>
                </div>
                <div className="text-sm relative tracking-wide flex items-center space-x-2">
                    <p>Filter</p>
                    <button onClick={handleClickEvent}>
                        <FontAwesomeIcon icon={faAngleDown} className="font-bold text-dark-violet"/>
                    </button>
                    {
                        toggle && <Filter />
                    }
                </div>
            </div>
            <button style={{color: "white"}} className="bg-dark-violet text-sm rounded-full 
                flex justify-center items-center space-x-2 border-0 w-20 h-10
                hover:bg-light-violet">
                <FontAwesomeIcon className="text-3xl" icon={faCirclePlus} color="white"/>
                <p className="tracking-wider">New</p>
            </button>
        </div>
    )
}
export default InvoiceNav
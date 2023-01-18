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
        <div className="flex tracking-wide justify-between items-center font-bold mb-8">
            <div className="flex justify-between w-8/12 md:w-3/4">
                <div>
                    <h1 className="text-xl md:text-3xl lg:text-4xl">Invoices</h1>
                    <p className="text-light-gray text-sm lg:text-lg">
                        <span className="hidden md:inline-block">There are </span> {totalInvoice} invoices
                    </p>
                </div>
                <div className="text-sm md:text-md lg:text-xl relative tracking-wide flex items-center space-x-2">
                    <p>Filter <span className="hidden md:inline-block">by status</span></p>
                    <button onClick={handleClickEvent}>
                        <FontAwesomeIcon icon={faAngleDown} className="font-bold text-dark-violet"/>
                    </button>
                    {
                        toggle && <Filter />
                    }
                </div>
            </div>
            <button style={{color: "white", fontSize: ".9rem"}} 
                className="bg-dark-violet text-sm md:text-lg lg:text-xl md:p-2 rounded-full space-x-2
                flex p-2 items-center lg:space-x-4 border-0 w-24 md:w-40 lg:w-40 xl:w-48 h-11 md:h-12 lg:h-11 xl:h-14
                hover:bg-light-violet tracking-wider">
                <FontAwesomeIcon className="text-3xl lg:text-3xl xl:text-4xl" icon={faCirclePlus} color="white"/>
                <p className="lg:text-xl">
                    New <span className="hidden md:inline-block">Invoice</span>
                </p>
            </button>
        </div>
    )
}
export default InvoiceNav
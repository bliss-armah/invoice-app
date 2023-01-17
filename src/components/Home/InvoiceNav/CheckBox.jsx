// import { useState } from "react"

const CheckBox = ({label, inputId, labelfor}) => {
    
    // labelfor = label.toLowerCase()

    return (
        <div className="space-x-4 cursor-pointer">
                <input 
                    className=" border-none rounded bg-light-violet 
                    focus:ring-light-violet focus:bg-light-violet focus:outline-light-violet 
                    checked:bg-dark-violet focus:rounded-sm" 
                    type="checkbox"
                    id={inputId}/>
                <label className="cursor-pointer"
                    htmlFor={labelfor}>
                    {label}
                </label>
        </div>
    )
}

export default CheckBox
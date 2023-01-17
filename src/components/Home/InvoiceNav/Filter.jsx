import CheckBox from "./CheckBox"

const Filter = () => {
    return (
        <div className="absolute w-32 px-4 py-2 space-y-2 bg-light-white 
            lg:w-48 lg:h-32 -right-6 top-11 shadow-xl rounded-sm">

            <CheckBox label="Draft" inputId="draft" labelfor="draft"/>
            <CheckBox label="Pending" inputId="pending" labelfor="pending"/>
            <CheckBox label="Paid" inputId="paid" labelfor="paid"/>
            
        </div>
    )
}

export default Filter
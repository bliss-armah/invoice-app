import CheckBox from "./CheckBox"

const Filter = ({darkMode}) => {

    return (
        <div className={`z-50 ${darkMode ? 'shadow-lg shadow-draft bg-light-violet' : ''} absolute w-32 
            xl:w-60 lg:w-40 md:w-36 px-4 py-2 space-y-2 lg:h-auto bg-light-white 
            -right-6 top-11 lg:top-14 lg:p-5 xl:px-9 shadow-xl rounded-sm`}>

            <CheckBox label="Draft" inputId="draft" labelfor="draft" />
            <CheckBox label="Pending" inputId="pending" labelfor="pending"/>
            <CheckBox label="Paid" inputId="paid" labelfor="paid"/>

        </div>
    )
}

export default Filter
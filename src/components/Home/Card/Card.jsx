import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import TopContent from "./TopContent"
import BottomContent from "./BottomContent"

const Card = ({invoiceId,name,dueDate, amount, status}) => {
    return (
        // <div className='flex'>
            <div className="flex justify-between items-center h-auto bg-light-white  space-y-5 p-5 font-spartan rounded-lg">
                <div className='md:w-11/12 w-full p-1 items-center space-y-4'>
                    <TopContent invoiceId={invoiceId} name={name}/>
                    <BottomContent dueDate={dueDate} amount={amount} status={status}/>
                </div>
                <FontAwesomeIcon className='hidden md:block' icon={faAngleRight} />
            </div>
        // </div>
    )
}

export default Card
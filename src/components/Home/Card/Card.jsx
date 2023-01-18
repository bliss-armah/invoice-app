import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

const Card = ({invoiceId,name,dueDate, amount, status}) => {
    const changeBtnStatus = {
        paid: "bg-paid text-paid",
        pending: "bg-pending text-pending",
        draft: "bg-draft text-draft",
    }

    return (
            <div className='flex items-center px-10 p-5 w-full xl:h-1/6 h-auto text-sm xl:text-xl font-spartan 
                rounded-lg shadow-lg bg-light-white space-x-6 hover:border hover:border-light-violet 
                cursor-pointer'>
                <div className="md:flex md:justify-between md:items-center grid grid-cols-3  gap-2 w-full">
                    <p className="font-bold row-start-1 col-start-1 row-end-2 col-end-2">
                        <span className=" text-light-violet">#</span> 
                        {invoiceId}
                    </p>
                    <p className="text-light-violet row-start-2 col-start-1 row-end-3 col-end-2">Due {dueDate}</p>
                    <p className=" text-light-violet row-start-1 col-start-3
                        row-end-2 col-end-3">
                            {name}
                    </p>
                    <p className="font-bold text-xl xl:text-2xl row-start-3 col-start-1 row-end-4 col-end-2 row-span-2">£ {amount}</p>
                    <button className={"capitalize xl:w-44 xl:h-20 w-24 h-10 rounded-lg bg-opacity-5 row-start-2 col-start-3 row-end-4 col-end-3 "
                        + changeBtnStatus[status]}>
                        <FontAwesomeIcon className="mr-4" icon={faCircle} />
                        {status}
                    </button>
                </div>
                <button className='hidden md:inline-block'>
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>
    )
}

export default Card

import TopContent from "./TopContent"
import BottomContent from "./BottomContent"

const Card = ({invoiceId,name,dueDate, amount, status}) => {
    return (
        <div className="h-32 bg-light-white space-y-5 p-5 font-spartan rounded-lg">
            <TopContent invoiceId={invoiceId} name={name}/>
            <BottomContent dueDate={dueDate} amount={amount} status={status}/>
        </div>
    )
}

export default Card
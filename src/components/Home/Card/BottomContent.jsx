
import CardButton from "./CardButton"

const BottomContent = ({dueDate, amount, status}) => {
    return (
        <div className="flex justify-between">
            <div>
                <p className="text-light-violet text-md">Due {dueDate}</p>
                <p className="font-bold text-xl">£ {amount}</p>
            </div>

            <CardButton status={status}/>
        </div>
    )
} 

export default BottomContent
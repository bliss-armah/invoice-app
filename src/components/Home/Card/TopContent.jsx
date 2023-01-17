const TopContent = ({invoiceId, name}) => {
    return (
        <div className="flex justify-between">
            <p className="font-bold"><span className=" text-light-violet">#</span> {invoiceId} </p>
            <p className=" text-light-violet">{name}</p>
        </div>
    )
}

export default TopContent
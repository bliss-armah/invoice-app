import NoContentImg from "../../../../public/assets/illustration-empty.svg" 

const NoContent = () => {
    return (
        <div className="mt-44">
            <div className="flex flex-col justify-center items-center h-full space-y-3">
                <img src={NoContentImg} width="200" />
                <h1 className="text-xl lg:text-2xl">There is nothing here</h1>
                <p className="opacity-60 lg:text-lg">
                    Create a new invoice by clicking the <br></br>
                    <span className="font-bold">
                        New Invoice
                    </span> button and get started
                </p>
            </div>
        </div>
    )
}

export default NoContent
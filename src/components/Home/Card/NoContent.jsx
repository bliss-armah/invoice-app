import NoContentImg from "../../../assets/noContent.svg" 

const NoContent = () => {
    return (
        <div className="flex flex-col">
            <img src={NoContentImg} width="200" />
            <h1>There is nothing here</h1>
            <p>
                Create a new invoice by clicking the
                New Invoice button and get started
            </p>
        </div>
    )
}

export default NoContent
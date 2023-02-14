// import loader from "../../../../public/assets/loading.gif";
import './loader.css'

const Loader = () => {
  return (
    <div className="mt-[30%]">
      <div className="flex flex-col justify-center items-center h-full space-y-3">
        <div className="lds-ring ">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

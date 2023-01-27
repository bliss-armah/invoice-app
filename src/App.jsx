import { useState,useEffect } from "react";
import Nav from "./components/Home/Nav/Nav";
  import ConfirmDelete from "./components/confirmDelete/ConfirmDelete";
import CreateInvoice from "./components/createInvoice/CreateInvoice";
import Edit from "./components/editInvoiceForm/Edit";
import Viewinvoice from "./pages/Viewinvoice";
import Home from "./pages/Home";
import {Routes,Route} from "react-router-dom"


function App() {
  // Darkmode Effect
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
 
   
  return (

    <>
    <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
    <Routes>
      <Route path="/" exact element={<Viewinvoice/>} />
    </Routes>
    </>
  );
  
  }


export default App;

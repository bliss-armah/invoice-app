import { useState,useEffect } from "react";
import Nav from "./components/Home/Nav/Nav";
import invoiceData from "./data.json"
import ConfirmDelete from "./components/confirmDelete/ConfirmDelete";
import CreateInvoice from "./components/createInvoice/CreateInvoice";
import Edit from "./components/editInvoiceForm/Edit";
import Home from "./pages/Home";


function App() {
  // Darkmode Effect
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
 
   
  return (
    <div className={`App ${darkMode ? 'dark' : 'light'} `}>
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>      
      {/* <ConfirmDelete darkMode={darkMode} /> */}
      {/* <CreateInvoice darkMode={darkMode} /> */}

      
      <Edit darkMode = {darkMode}/>
    </div>
  );
  
  }


export default App;

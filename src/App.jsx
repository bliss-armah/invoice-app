import { useState } from "react";
import Nav from "./components/Home/Nav/Nav";
import invoiceData from "./data.json"
import ConfirmDelete from "./components/confirmDelete/ConfirmDelete";
import CreateInvoice from "./components/createInvoice/CreateInvoice";
import Edit from "./components/editInvoiceForm/Edit";

function App() {
  // Darkmode Effect
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'} lg:flex overflow-y-scroll`}>
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>      
      {/* <ConfirmDelete darkMode={darkMode} /> */}
      <CreateInvoice darkMode={darkMode} />
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>

      <Edit/>

    </div>
  );
  
}

export default App;

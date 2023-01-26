import { useState,useEffect } from "react";
import Nav from "./components/Home/Nav/Nav";
import ConfirmDelete from "./components/confirmDelete/ConfirmDelete";
import CreateInvoice from "./components/createInvoice/CreateInvoice";
import Edit from "./components/editInvoiceForm/Edit";
import Viewinvoice from "./pages/Viewinvoice";
import Home from "./pages/Home";
import ViewInvoice from "./pages/Viewinvoice";
import {Routes,Route} from "react-router-dom"



function App() {
  // Darkmode Effect
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
 
   
  return (
    <>

    <div className={`App ${darkMode ? 'dark' : 'light'} lg:flex`}>
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <Home darkMode={darkMode}/>
      {/* <ConfirmDelete darkMode={darkMode} /> */}

      {/* <CreateInvoice darkMode={darkMode} /> */}

      
      {/* <Edit darkMode = {darkMode}/> */}
      </div>
    <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
    <Routes>
      <Route path="/" exact element={<Home/>} />
      {/* <Route path="/viewinvoice/:id"  element={<ViewInvoice/>} /> */}
    </Routes>
    </>

  );
  
  }


export default App;

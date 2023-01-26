import { useState,useEffect } from "react";
import Nav from "./components/Home/Nav/Nav";
import Edit from "./components/editInvoiceForm/Edit";
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
    <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
    <Routes>
      <Route path="/" exact element={<Home/>} />
      {/* <Route path="/viewinvoice/:id"  element={<ViewInvoice/>} /> */}
    </Routes>
    </>
  );
  
  }


export default App;

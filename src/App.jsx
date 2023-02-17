import { useState,useEffect } from "react";
import Nav from "./components/Home/Nav/Nav";
import Home from "./pages/Home";
import ViewInvoice from "./pages/Viewinvoice";
import {Routes,Route} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";



function App() {
  // Darkmode Effect
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
 

   
  return (

    <div className={`App ${darkMode ? 'dark' : 'light'} `}>
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <Routes>
      <Route path="/" exact element={<Home darkMode={darkMode}/>} />
      <Route path="/viewinvoice/:id"  element={<ViewInvoice darkMode={darkMode}/>} />
    </Routes>
      </div>

  );
}


export default App;
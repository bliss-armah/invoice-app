import { useState } from "react";
import Nav from "./components/Home/Nav/Nav";
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

    <div className={`App ${darkMode ? 'dark' : 'light'} lg:flex`}>
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <Routes>
      <Route path="/" exact element={<Home darkMode={darkMode}/>} />
      <Route path="/viewinvoice/:id"  element={<Viewinvoice />} />
    </Routes>
      </div>

  );
}


export default App;

import { useState } from "react";
import NoContent from "./components/Home/Card/NoContent";
import Nav from "./components/Home/Nav/Nav";
import Home from "./pages/Home";
import invoiceData from "./data.json"

const totalInvoice = invoiceData.length
console.log(totalInvoice);

function App() {
  // Darkmode Effect
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'} lg:flex overflow-y-scroll`}>
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>

      

      {
        totalInvoice 
        ? <NoContent /> 
        : <Home darkMode={darkMode}/>
      }
    </div>
  );
  
}

export default App;

import { useState } from "react";
import NoContent from "./components/Home/Card/NoContent";
import Nav from "./components/Home/Nav/Nav";
import Home from "./pages/Home";
import invoiceData from "./data.json"

const totalInvoice = invoiceData.length

function App() {
  // Darkmode Effect
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    // <div>
    <div className={`App ${darkMode ? 'dark' : 'light'} lg:flex`}>

      {/* Darkmode button */}
      {/* <button
        style={{ position: "absolute", top: "5%", left: "5%", zIndex: "200" }}
        onClick={toggleDarkMode}
      >
        Toggle Dark Mode
      </button> */}

        <Nav />
        {totalInvoice == 0 ? <NoContent /> : <Home />}
    </div>
  );
  
}

export default App;

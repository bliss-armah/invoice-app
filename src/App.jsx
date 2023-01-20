import { useState } from "react";
import Nav from "./components/Home/Nav/Nav";
import Home from "./pages/Home";
import ConfirmDelete from "./components/confirmDelete/ConfirmDelete";
import CreateInvoice from "./components/createInvoice/CreateInvoice";

function App() {
  // Darkmode Effect
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'} lg:flex`}>
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <Home darkMode={darkMode}/>
      {/* <ConfirmDelete darkMode={darkMode} /> */}
    </div>
  );
  
}

export default App;

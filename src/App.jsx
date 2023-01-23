import { useState } from "react";
import Nav from "./components/Home/Nav/Nav";
import Viewinvoice from "./pages/Viewinvoice";
// import ConfirmDelete from "./components/confirmDelete/ConfirmDelete";
// import CreateInvoice from "./components/createInvoice/CreateInvoice";

function App() {
  // Darkmode Effect
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>      
      {/* <ConfirmDelete darkMode={darkMode} /> */}
      {/* <CreateInvoice darkMode={darkMode} /> */}
      <Viewinvoice darkMode={darkMode} />
    </div>
  );
  
}

export default App;

import { useState } from "react";
import ConfirmDelete from "./components/confirmDelete/ConfirmDelete";

function App() {
  // Darkmode Effect
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>

      {/* Darkmode button */}
      <button
        style={{ position: "absolute", top: "5%", left: "5%", zIndex: "200" }}
        onClick={toggleDarkMode}
      >
        Toggle Dark Mode
      </button>
      <ConfirmDelete darkMode={darkMode} />
    </div>
  );
  
}

export default App;

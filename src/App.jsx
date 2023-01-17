import { useState } from "react";
import Home from "./pages/Home";

function App() {
  // Darkmode Effect
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
    {/* <div className={`App ${darkMode ? 'dark' : 'light'}`}> */}

      {/* Darkmode button */}
      {/* <button
        style={{ position: "absolute", top: "5%", left: "5%", zIndex: "200" }}
        onClick={toggleDarkMode}
      >
        Toggle Dark Mode
      </button> */}
      <Home />
    </div>
  );
  
}

export default App;

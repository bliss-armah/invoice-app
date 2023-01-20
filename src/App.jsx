import { useState } from "react";
import Nav from "./components/Home/Nav/Nav";
import Home from "./pages/Home";

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
  
    </div>
  );
  
}

export default App;

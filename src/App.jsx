import Nav from "./components/Home/Nav/Nav";
import Home from "./pages/Home";
import ViewInvoice from "./pages/Viewinvoice";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Darkmode Effect

  const darkMode = useSelector((state) => state.invoice.isDarkMode);

  return (
    <div className={`App ${darkMode ? "dark" : "light"} `}>
      <Nav />
      <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/viewinvoice/:id"  element={<ViewInvoice />} />
    </Routes> 
    <ToastContainer position="top-center"/>
 
    </div>
  );
}

export default App;

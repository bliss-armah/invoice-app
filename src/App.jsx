import Nav from "./components/Home/Nav/Nav";
import Home from "./pages/Home";
import ViewInvoice from "./pages/Viewinvoice";
import {Routes,Route} from "react-router-dom"
import { useSelector } from "react-redux";
import ConfirmDelete from "./components/confirmDelete/ConfirmDelete";



function App() {
  // Darkmode Effect

  const darkMode = useSelector((state) => state.invoice.isDarkMode)

   
  return (

    <div className={`App ${darkMode ? 'dark' : 'light'} `}>
    {/* // <div className='App'> */}
      <Nav />
      <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/viewinvoice/:id"  element={<ViewInvoice />} />
    </Routes>
      </div>

  );
}


export default App;
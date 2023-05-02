
import CustomNavbar from "./components/Navbar.js";
import FilesTable from "./components/FilesTable.js";
import { ToastContainer } from 'react-toastify';


function App() {
  
  return (
    <>

      <CustomNavbar/>

      <ToastContainer />

      <FilesTable/>
      

    </>
  );

}



export default App;

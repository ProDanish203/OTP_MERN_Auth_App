import './App.css';
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import { Router } from './Config/Router';

function App() {
  return (
    <main>
      
      {/* <ToastContainer/>  */}
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <Router/>

    </main>
  );
}

export default App;

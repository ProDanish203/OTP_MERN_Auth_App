import './App.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Router } from './Config/Router';

function App() {
  return (
    <main>
      
      <ToastContainer/> 

      <Router/>

    </main>
  );
}

export default App;

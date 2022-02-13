import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/Login';
import Register from './Components/Register';
import ForgotPassword from './Components/ForgotPassword';



function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path ='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path ='/' element={<Login/>} />
        </Routes>
      </Router>
   </>
  );
}

export default App;


import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Trance from './Components/translate';
import Login from './Components/register';
import Register from './Components/login';
import Home from './Components/Home';
import Main from './Components/main';

function App() {
  return (
      <BrowserRouter>
      <Home />
      <Routes>
      <Route exact path='/' element={<Main />} />ee
        <Route exact path='/r' element={<Login />} />
        <Route exact path='/t' element={<Register />} />
        <Route exact path='/tf' element={<Trance />} />
        </Routes>
        </BrowserRouter>
  );
}

export default App;

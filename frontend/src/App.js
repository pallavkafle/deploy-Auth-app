import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';

function App() {
 
const [isAuthenticated, setIsAuthenticated] = useState(null);
const PrivateRoute = ({ element }) => {
  return  isAuthenticated ? element : <Navigate to="/login" />;
}

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to ="/Signup" />} />
        <Route path="/home" element={<PrivateRoute element={<Home/>}/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    
    </div>
  );
}

export default App;

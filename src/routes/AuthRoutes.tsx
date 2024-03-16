import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';



const AuthRoutes: React.FC = () => {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default AuthRoutes;
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Employees from '../pages/Employees';
import Companies from '../pages/Companies';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ProtectedRoutes from './ProtectedRoutes';


const OtherRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<ProtectedRoutes/>}>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/employees" element={<Employees/>} />
        <Route path="/companies" element={<Companies/>} />
        <Route path="*" element={<Navigate to="/dashboard"/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<Navigate to="/login"/>} />
      </Route>
      </Routes>
    </BrowserRouter>
  );

};

export default OtherRoutes;
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Employees from '../pages/Employees';
import Companies from '../pages/Companies';
import Dashboard from '../pages/Dashboard';


const OtherRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/employees" element={<Employees/>} />
      <Route path="/companies" element={<Companies/>} />
      <Route path="*" element={<Navigate to="/employees"/>} />
      </Routes>
    </BrowserRouter>
  );

};

export default OtherRoutes;
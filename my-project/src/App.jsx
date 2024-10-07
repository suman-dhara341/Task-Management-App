import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './LoginPage/LoginPage';
import Register from './SignUp/Register';
import Taskadd from './Task/TaskAdd.jsx';  
import Task from './Task/Task.jsx';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/TaskAdd" element={<Taskadd />} />  
          <Route path="/Task" element={<Task />} />
          <Route path="/TaskAdd/:id" element={<Taskadd />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

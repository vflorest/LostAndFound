import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import AdminLogin from './components/AdminLogin';
import AdminHome from './pages/AdminHome';
import RegisterLostObject from './components/RegisterLostObject';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/admin/register-lost-object" element={<RegisterLostObject />} />
            </Routes>
        </Router>
    );
}

export default App;

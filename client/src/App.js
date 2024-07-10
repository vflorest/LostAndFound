import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import UserHome from './pages/UserHome';
import AdminHome from './pages/AdminHome';
import Profile from './pages/Profile';
import Requests from './pages/Requests';
import RegisterLostObject from './components/RegisterLostObject';
import ViewLostObjects from './pages/ViewLostObjects';
import ViewRequests from './pages/ViewRequests';
import CreateRequest from './pages/CreateRequest';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './pages/UserDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm isAdmin={false} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<UserHome />} />
                <Route path="/admin-login" element={<LoginForm isAdmin={true} />} />
                <Route path="/admin/home" element={<PrivateRoute><AdminHome /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/requests" element={<PrivateRoute><Requests /></PrivateRoute>} />
                <Route path="/admin/register-lost-object" element={<PrivateRoute><RegisterLostObject /></PrivateRoute>} />
                <Route path="/admin/view-lost-objects" element={<PrivateRoute><ViewLostObjects /></PrivateRoute>} />
                <Route path="/admin/view-requests" element={<PrivateRoute><ViewRequests /></PrivateRoute>} />
                <Route path="/admin/create-request" element={<PrivateRoute><CreateRequest /></PrivateRoute>} />
                <Route path="/user/home" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;

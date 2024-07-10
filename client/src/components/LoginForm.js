import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ isAdmin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSignInClick = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Email no válido');
            return;
        }
        const userData = {
            email: email,
            password: password
        };

        try {
            console.log('Sending login request with:', userData);
            const response = await axios.post(
                isAdmin ? 'http://localhost:3001/api/auth/admin-login' : 'http://localhost:3001/api/auth/login', 
                userData
            );
            const user = response.data.user || response.data.admin;
            console.log('Login successful:', user);
            navigate(isAdmin ? '/admin/home' : '/');
        } catch (err) {
            console.error('Login error:', err);
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4">{isAdmin ? 'Admin Login' : 'Bienvenido a Lost&Found'}</h1>
                    <p className="font-medium text-lg text-gray-500">{isAdmin ? 'Admin, please enter your credentials.' : 'Welcome back! Please enter your credentials.'}</p>
                </div>
                <form onSubmit={handleSignInClick} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <input type="checkbox" id="remember" />
                            <label className="ml-2 font-medium text-base" htmlFor="remember">Remember me</label>
                        </div>
                        <button type="button" className="font-medium text-base text-violet-500">Forgot Password</button>
                    </div>
                    <div className="flex flex-col gap-y-4">
                        <button type="submit" className="py-3 rounded-xl bg-violet-500 text-white text-lg font-bold">Sign in</button>
                        {!isAdmin && (
                            <button type="button" className="py-3 rounded-xl border-2 border-gray-100 text-lg font-bold" onClick={() => navigate('/admin-login')}>Acceso Administrador</button>
                        )}
                        {isAdmin && (
                            <button type="button" className="py-3 rounded-xl border-2 border-gray-100 text-lg font-bold" onClick={() => navigate('/')}>Volver a Usuario</button>
                        )}
                    </div>
                    {!isAdmin && (
                        <div className="text-center mt-8">
                            <p className="font-medium text-base">Don't have an account?</p>
                            <button type="button" className="text-violet-500 text-base font-medium ml-2" onClick={() => navigate('/register')}>Sign up</button>
                        </div>
                    )}
                    {error && <div className="mt-4 text-red-500">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
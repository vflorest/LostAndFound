import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegisterClick = async (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        };

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, userData);
            navigate('/login');
        } catch (err) {
            setError('Error registrando usuario');
        }
    };

    return (
        <>
            <NavBar isAdmin={false} />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4">Registro de Usuario</h1>
                    </div>
                    <form onSubmit={handleRegisterClick} className="space-y-6">
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
                        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Registrarse</button>
                        <button type="button" className="w-full bg-gray-500 text-white p-2 rounded mt-2" onClick={() => navigate('/login')}>Volver a Login</button>
                        {error && <div className="mt-4 text-red-500">{error}</div>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;

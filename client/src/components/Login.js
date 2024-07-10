import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }
            const data = await response.json();
            localStorage.setItem('token', data.token); // Almacenar el token en el almacenamiento local
            alert('Inicio de sesión exitoso');
            navigate('/');
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            alert('Error al iniciar sesión');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-700">Correo Electrónico:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;

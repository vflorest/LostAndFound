import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleRegisterClick = async () => {
        if (!validateEmail(email)) {
            setError('Email no válido');
            return;
        }

        try {
            await axios.post('http://localhost:3001/api/auth/register', { email, password });
            navigate('/login'); // Redirigir a la página de inicio de sesión
        } catch (err) {
            setError('Error al registrar el usuario');
        }
    };

    return (
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
            <div className="text-center text-5xl font-semibold">
                <span className="block lg:inline">Regístrate</span>
            </div>
            <div className="mt-8">
                <div>
                    <label htmlFor="email" className="text-lg font-medium">Email</label>
                    <input 
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email" />
                </div>
                <div>
                    <label htmlFor="password" className="text-lg font-medium">Password</label>
                    <input 
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' 
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password" />
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button onClick={handleRegisterClick} className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold">Regístrate</button>
                    <button onClick={() => navigate('/login')} className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl border-2 border-gray-100 text-lg font-bold">Volver al Login</button>
                </div>
                {error && <div className="mt-4 text-red-500">{error}</div>}
            </div>
        </div>
    );
}

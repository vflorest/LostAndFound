import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
    const [showWelcome, setShowWelcome] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
            navigate('/user/home'); // Redirigir al home de usuarios después de 5 segundos
        }, 5000); // 5000 ms (5 segundos)
        return () => clearTimeout(timer);
    }, [navigate]);

    if (showWelcome) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Bienvenido a Lost&Found</h1>
                    <p className="text-lg">Estamos aquí para ayudarte a encontrar tus objetos perdidos.</p>
                </div>
            </div>
        );
    }

    return null;
};

export default UserHome;

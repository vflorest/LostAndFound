import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ isAdmin }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogoClick = () => {
        navigate(isAdmin ? '/admin/home' : '/user/home');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl cursor-pointer" onClick={handleLogoClick}>
                    Lost&Found
                </div>
                <div className="relative">
                    <button onClick={handleMenuClick} className="text-white font-bold">
                        Menu
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                            <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Perfil</Link>
                            <Link to="/requests" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Mis Solicitudes</Link>
                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Cerrar sesión</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

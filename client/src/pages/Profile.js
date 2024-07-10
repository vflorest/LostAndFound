import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/NavBar';

const Profile = () => {
    const [user, setUser] = useState({ email: '', name: '' });

    useEffect(() => {
        // Cargar datos del usuario desde el backend
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/users/me');
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:3001/api/users/me', user);
            alert('Datos actualizados exitosamente');
        } catch (err) {
            console.error('Error updating user data:', err);
            alert('Error al actualizar los datos');
        }
    };

    return (
        <>
            <Navbar isAdmin={false} />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Perfil</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                            disabled
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <button type="submit" className="py-2 px-4 bg-violet-500 text-white rounded">Guardar Cambios</button>
                </form>
            </div>
        </>
    );
};

export default Profile;

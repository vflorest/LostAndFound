import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const RegisterLostObject = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('location', location);
        formData.append('description', description);
        if (file) {
            formData.append('file', file);
        }

        try {
            const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
            console.log('Token being sent:', token); // Debug
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/register-lost-object`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` // Enviar el token en el encabezado Authorization
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error('Error al registrar objeto perdido');
            }
            alert('Objeto perdido registrado exitosamente');
            navigate('/admin/home');
        } catch (err) {
            console.error('Error al registrar objeto perdido:', err);
            alert('Error al registrar objeto perdido');
        }
    };

    return (
        <>
            <NavBar isAdmin={true} />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4">Registrar Objeto Perdido</h2>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Ubicación:</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Descripción:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Foto (opcional):</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Registrar</button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/home')}
                        className="w-full bg-gray-500 text-white p-2 mt-2 rounded"
                    >
                        Volver al Menú Principal
                    </button>
                </form>
            </div>
        </>
    );
};

export default RegisterLostObject;

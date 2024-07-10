// UserDashboard.js
import React, { useState } from 'react';
import Navbar from '../components/NavBar';

const UserDashboard = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (file) {
            formData.append('file', file);
        }

        try {
            const response = await fetch('http://localhost:3001/api/users/register-request', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error('Error al ingresar solicitud');
            }
            alert('Solicitud ingresada exitosamente');
            // Limpiar los campos del formulario
            setName('');
            setDescription('');
            setFile(null);
            document.getElementById('file').value = null; // Limpiar input file
        } catch (err) {
            console.error('Error al ingresar solicitud:', err);
            alert('Error al ingresar solicitud');
        }
    };

    return (
        <>
            <Navbar isAdmin={false} />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Ingresar Solicitud de Objeto Perdido</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-gray-700">Descripción:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="file" className="block text-gray-700">Foto (opcional):</label>
                        <input
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <button type="submit" className="py-2 px-4 bg-violet-500 text-white rounded">Enviar Solicitud</button>
                </form>
            </div>
        </>
    );
};

export default UserDashboard;

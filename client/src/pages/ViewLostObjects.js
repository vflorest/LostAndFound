import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';

const ViewLostObjects = () => {
    const [lostObjects, setLostObjects] = useState([]);

    useEffect(() => {
        const fetchLostObjects = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/admin/lost-objects', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Error fetching lost objects');
                }
                const data = await response.json();
                setLostObjects(data);
            } catch (err) {
                console.error('Error fetching lost objects:', err);
            }
        };
        fetchLostObjects();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/admin/lost-objects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Error deleting lost object');
            }
            // Eliminar el objeto del estado local
            setLostObjects(lostObjects.filter((object) => object.id !== id));
        } catch (err) {
            console.error('Error deleting lost object:', err);
        }
    };

    return (
        <>
            <Navbar isAdmin={true} />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Objetos Perdidos</h1>
                <ul className="space-y-4">
                    {lostObjects.map((object) => (
                        <li key={object.id} className="p-4 border border-gray-300 rounded">
                            <h2 className="text-xl font-bold">{object.name}</h2>
                            <p>{object.description}</p>
                            {object.photo && (
                                <img src={`http://localhost:3001/uploads/${object.photo}`} alt={object.name} className="w-32 h-32 object-cover mt-2" />
                            )}
                            <p className="text-gray-500">Registrado el: {new Date(object.createdAt).toLocaleString()}</p>
                            <button
                                onClick={() => handleDelete(object.id)}
                                className="mt-2 py-1 px-4 bg-red-500 text-white rounded"
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ViewLostObjects;

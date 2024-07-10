import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';

const ViewLostObjects = () => {
    const [lostObjects, setLostObjects] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLostObjects = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/lost-objects`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('No se pudieron obtener los objetos perdidos');
                }
                const data = await response.json();
                setLostObjects(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchLostObjects();
    }, []);

    return (
        <>
            <NavBar isAdmin={true} />
            <div className="min-h-screen bg-gray-100 p-4">
                <h1 className="text-2xl font-bold mb-4">Objetos Perdidos Registrados</h1>
                {error && <p className="text-red-500">{error}</p>}
                <ul>
                    {lostObjects.map((object) => (
                        <li key={object.id} className="mb-2">
                            <p><strong>Nombre:</strong> {object.name}</p>
                            <p><strong>Ubicación:</strong> {object.location}</p>
                            <p><strong>Descripción:</strong> {object.description}</p>
                            <p><strong>Fecha:</strong> {new Date(object.created_at).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ViewLostObjects;

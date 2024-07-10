import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/NavBar';

const ViewLostObjects = () => {
    const [lostObjects, setLostObjects] = useState([]);

    useEffect(() => {
        const fetchLostObjects = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/admin/lost-objects');
                setLostObjects(response.data);
            } catch (err) {
                console.error('Error fetching lost objects:', err);
            }
        };
        fetchLostObjects();
    }, []);

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
                            <img src={`http://localhost:3001/uploads/${object.photo}`} alt={object.name} className="w-32 h-32 object-cover mt-2" />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ViewLostObjects;

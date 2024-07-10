import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/NavBar';

const ViewRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/admin/requests');
                setRequests(response.data);
            } catch (err) {
                console.error('Error fetching requests:', err);
            }
        };
        fetchRequests();
    }, []);

    return (
        <>
            <Navbar isAdmin={true} />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Solicitudes</h1>
                <ul className="space-y-4">
                    {requests.map((request) => (
                        <li key={request.id} className="p-4 border border-gray-300 rounded">
                            <h2 className="text-xl font-bold">{request.name}</h2>
                            <p>{request.description}</p>
                            <img src={`http://localhost:3001/uploads/${request.photo}`} alt={request.name} className="w-32 h-32 object-cover mt-2" />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ViewRequests;

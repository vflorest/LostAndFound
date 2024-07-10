import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminHome() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-8">Panel de Administración</h1>
            <div className="grid grid-cols-1 gap-4 w-full max-w-md">
                <button onClick={() => navigate('/admin/register-lost-object')} className="bg-blue-500 text-white p-4 rounded-lg">Registrar Objeto Perdido</button>
                <button onClick={() => navigate('/admin/view-lost-objects')} className="bg-blue-500 text-white p-4 rounded-lg">Ver Objetos Perdidos</button>
                <button onClick={() => navigate('/admin/view-requests')} className="bg-blue-500 text-white p-4 rounded-lg">Ver Solicitudes</button>
                <button onClick={() => navigate('/admin/create-request')} className="bg-blue-500 text-white p-4 rounded-lg">Ingresar Nueva Solicitud</button>
            </div>
        </div>
    );
}

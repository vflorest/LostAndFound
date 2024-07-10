import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterLostObject = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setPhoto(imageSrc);
        setIsCameraOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            location,
            date,
            photo,
            description
        };

        try {
            await axios.post('http://localhost:3001/api/lost-objects/register', formData);
            alert('Data submitted successfully!');
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Failed to submit data');
        }
    };

    return (
        <div className="min-h-screen bg-purple-700 flex items-center justify-center p-4">
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
                    <label className="block text-gray-700">Fecha:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
                    <button
                        type="button"
                        onClick={() => setIsCameraOpen(true)}
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        {photo ? 'Retake Photo' : 'Take Photo'}
                    </button>
                </div>

                {isCameraOpen && (
                    <div className="mb-4">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full"
                        />
                        <button
                            type="button"
                            onClick={capturePhoto}
                            className="w-full bg-green-500 text-white p-2 mt-2 rounded"
                        >
                            Capture Photo
                        </button>
                    </div>
                )}

                {photo && (
                    <div className="mb-4">
                        <img src={photo} alt="Captured" className="w-full rounded" />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-2 rounded"
                >
                    Registrar
                </button>

                <button
                    type="button"
                    onClick={() => navigate('/admin/home')}
                    className="w-full bg-gray-500 text-white p-2 mt-2 rounded"
                >
                    Volver al Menú Principal
                </button>
            </form>
        </div>
    );
};

export default RegisterLostObject;

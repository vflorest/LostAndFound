import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './Home.css'; // Archivo CSS para las transiciones

export default function Home() {
    const [show, setShow] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            setTimeout(() => navigate('/login'), 500); // Tiempo de la transición (0.5s)
        }, 5000); // 5 segundos

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <CSSTransition
            in={show}
            timeout={500}
            classNames="fade"
            unmountOnExit
        >
            <div className="flex justify-center items-center min-h-screen bg-violet-500">
                <h1 className="text-white text-5xl font-bold">Bienvenido a Lost&Found</h1>
            </div>
        </CSSTransition>
    );
}

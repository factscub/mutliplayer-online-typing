import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate();
    const user = useMemo(() => JSON.parse(localStorage.getItem('user')), []);

    useEffect(() => {
        if (!user) {
            return navigate('/');
        }
    }, [user]);

    return (
        <>{ user && children}</>
    )
}

export default ProtectedRoute
import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


const ProtectedAuthRoutes = ({element}) => {
    const token = sessionStorage.getItem('token');

    if(token) {
        const decodedToken = jwt_decode(token);
        const userRole = decodedToken?.role;
        if(userRole === 'admin') {
            return <Navigate to={"/admin/dashboard"}/>
        }
        if(userRole === 'user') {
            return <Navigate to={"/home"}/>
        }
    }
    return element;
}

export default ProtectedAuthRoutes;
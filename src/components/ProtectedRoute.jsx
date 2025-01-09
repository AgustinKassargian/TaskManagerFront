import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'

function ProtectedRoute() {
    
    const {loading, isAuthenticated} = useAuth();
    
    if(!loading && !isAuthenticated){
        return <Navigate to='/' replace/>
    }
    return (
        <Outlet/>
    )
}

export default ProtectedRoute

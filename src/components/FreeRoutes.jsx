import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'
function FreeRoutes() {
    const {loading, isAuthenticated} = useAuth();

    if(!loading && isAuthenticated){
        return <Navigate to='/my-tasks' replace/>
    } 
    return (
        <Outlet/>
    )
}

export default FreeRoutes

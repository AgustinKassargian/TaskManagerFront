import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthContext, AuthProvider } from './components/AuthContext';
import MyTasksPage from './pages/MyTasksPage';
import FreeRoutes from './components/FreeRoutes';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<FreeRoutes/>}>
            <Route path='/' element={<LoginPage/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/my-tasks' element={<MyTasksPage/>}/>
          </Route>
            <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

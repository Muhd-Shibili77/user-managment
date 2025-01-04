import React from 'react'
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'
import Home from './pages/user/Home'
import AdminLoign from './pages/admin/adminLoign'
import Dashboard from './pages/admin/dashboard'
import { Route,Routes } from 'react-router'
import ProtectedRoute from './components/protectedRoute/protectedRoute'
import ProtectedAuthRoutes from './components/protectedRoute/protectedAuthRoutes'
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <>
        <Routes>
              <Route path='/' element={<ProtectedAuthRoutes element={<Login/>}/>}/>
              <Route path='/register' element={<ProtectedAuthRoutes element={<Signup/>}/>}/>
              <Route path='/home' element={<ProtectedRoute element={<Home/>} requiredRole={'user'}/>}/>
              <Route path='/admin/login' element={<ProtectedAuthRoutes element={<AdminLoign/>}/>}/>
              <Route path='/admin/dashboard' element={<ProtectedRoute element={<Dashboard/>} requiredRole={'admin'}/>}/>

              <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </>
  )
}

export default App
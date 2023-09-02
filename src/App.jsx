import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import Index from './Pages/Index'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import { PassProvider } from './context/PasswordContext'
const App = () => {
  return (
    <AuthProvider>
      <PassProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/registro' element={<Register/>} />
            <Route element={<ProtectedRoute/>}>

              <Route path='/' element={<Index/>} />
              <Route path='/profile' element={<Profile/>} />
            
            </Route>
          </Routes>
        </BrowserRouter>
      </PassProvider>
    </AuthProvider>
  )
}

export default App
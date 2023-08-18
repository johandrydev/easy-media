import { Routes, Route } from 'react-router-dom'
import { Login } from '../pages/login/Login'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={<Login />} />
        {/* <Route path="register" element={ <RegisterPage /> } />

        <Route path='/*' element={ <Navigate to="/auth/login" /> } /> */}
    </Routes>
  )
}

import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom'
import { useUserStore } from './stores/user.store'

import { AuthRoutes } from './auth/router/AuthRoutes'
import { EasyAppRoutes } from './easy-app/router/EasyAppRoutes'

export const AppRouter = () => {
  const isAutenticated = useUserStore(state => state.isAutenticated)
  return (
    <BrowserRouter>
      <Routes>
        {
          isAutenticated
            ? < Route path="/*" element={<EasyAppRoutes />} />
            : <Route path="/auth/*" element={<AuthRoutes />} />
        }
        <Route path='/*' element={<Navigate to='/auth/login' />} />
      </Routes>
    </BrowserRouter>
  )
}

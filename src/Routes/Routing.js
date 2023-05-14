import React, { useContext } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import {
  AdminRoutes,
  AuthRoutes,
  NotAuthRoutes,
  UserRoutes,
} from './ProtectedRoutes'
import App from '../App'
import { AuthContext } from '../Utilities/AuthProvider'
import { Login, Admin, User } from './lazyLoading'
import AdminPanel from '../Pages/Admin'
import UserRoot from '../Pages/User'

const Router = () => {
  const {
    auth: { state, role },
  } = useContext(AuthContext)

  console.log(state, role)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: 'login',
          element: (
            <NotAuthRoutes auth={state} path='/'>
              <Login />
            </NotAuthRoutes>
          ),
        },
        {
          path: 'admin',
          element: (
            <UserRoutes auth={state} role={role} path='/user'>
              <AuthRoutes auth={state} path='/login'>
                <AdminPanel />
              </AuthRoutes>
            </UserRoutes>
          ),
          children: [
            {
              path: ':id',
              element: <Admin />,
            },
          ],
        },
        {
          path: 'user',
          element: (
            <AdminRoutes auth={state} role={role} path='/admin'>
              <AuthRoutes auth={state} path='/login'>
                <UserRoot />
              </AuthRoutes>
            </AdminRoutes>
          ),
          children: [
            {
              path: ':id',
              element: <User />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <p>not found</p>,
    },
  ])

  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </React.Suspense>
  )
}

export default Router

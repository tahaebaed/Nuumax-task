import React from 'react'
import { Navigate } from 'react-router'

export const AdminRoutes = ({ role, path, auth, children }) => {
  if (auth && role === 'admin') {
    return <Navigate to={path} replace />
  }
  return children
}
export const UserRoutes = ({ role, path, auth, children }) => {
  if (auth && role === 'user') {
    return <Navigate to={path} replace />
  }
  return children
}
export const NotAuthRoutes = ({ path, auth, children }) => {
  if (auth) {
    return <Navigate to={path} replace />
  }
  return children
}
export const AuthRoutes = ({ path, auth, children }) => {
  if (!auth ) {
    return <Navigate to={path} replace />
  }
  return children
}

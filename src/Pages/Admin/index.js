import React, { useContext, useEffect } from 'react'
import { Outlet, matchPath, useMatch, useNavigate, useResolvedPath } from 'react-router-dom'
import { AuthContext } from '../../Utilities/AuthProvider'

const AdminPanel = () => {
  const path = useResolvedPath()
  const navigate = useNavigate()
  const {auth:{id}} = useContext(AuthContext)
  useEffect(() => {
    if(path.pathname === '/admin'){
      navigate(path.pathname + '/' + id, {
        replace:true
      })
    }
  }, [])
  
  return (
    <Outlet/>
  )
}

export default AdminPanel
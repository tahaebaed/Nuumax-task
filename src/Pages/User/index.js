import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate, useResolvedPath } from 'react-router-dom'
import { AuthContext } from '../../Utilities/AuthProvider'

const UserRoot = () => {
    const path = useResolvedPath()
    const navigate = useNavigate()
    const {auth:{id}} = useContext(AuthContext)
    useEffect(() => {
      if(path.pathname === '/user'){
        navigate(path.pathname + '/' + id, {
          replace:true
        })
      }
    }, [])
    
    return (
      <Outlet/>
    )
}

export default UserRoot
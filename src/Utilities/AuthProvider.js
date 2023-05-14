import React, { createContext, useState } from 'react'

const initialState =  JSON.parse(localStorage.getItem('user')) || {
    id: 0 ,
    state: null,
    role: null,
  }

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState(initialState)
  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

import { Button, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import InputControl from '../Components/inputs/InputControl'
import { AuthContext } from '../Utilities/AuthProvider'

const Login = () => {
  const { setAuth } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/users')
      const data = await response.json()
      const user = data.find(e => e.email === email && e.password === password)
      if (user) {
        setAuth(user => ({
          ...user,
          id: user.id,
          state: true,
          role: user.role,
        }))
        localStorage.setItem(
          'user',
          JSON.stringify({id:user.id, state: true, role: user.role })
        )
      } else {
        alert('invalid credentials')
      }
    } catch (error) {
      console.log(`Fetch error: ${error.name}`)
    }
  }
  return (
    <section id='login'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <InputControl
          label='Email'
          type='email'
          handleChange={e => setEmail(s => (s = e.target.value))}
          query={email}
        />
        <InputControl
          label='Password'
          type='password'
          handleChange={e => setPassword(s => (s = e.target.value))}
          query={password}
        />

        <Button type='submit' variant='contained'>
          login
        </Button>
      </form>
    </section>
  )
}

export default Login

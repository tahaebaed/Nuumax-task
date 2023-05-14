import React, { useContext, useEffect, useState } from 'react'
import VacsTable from '../../Components/VacsTable'
import Grid from '@mui/material/Grid'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { AuthContext } from '../../Utilities/AuthProvider'

const User = () => {
  const { setAuth} = useContext(AuthContext)
  const [vacs, setVacs] = useState([])
  const [user, setUser] = useState([])
  const param = useParams()
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/'+ param.id)
      const data = await response.json()
      const vacsResponse = await fetch('http://localhost:3000/vacations')
      const vacsData = await vacsResponse.json()
      setVacs(vacsData)
      setUser(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Grid container spacing={2} alignItem='center' justifyContent='center'>
      <Grid className='vacations-count' item xs={12} alignItems='flex-end'>
          <Button variant='contained'>request</Button>
          <Button onClick={()=> {
            localStorage.removeItem('user')
            setAuth(s => ({
              ...s,
              state:null,
              role: ''
            }))
            }} variant='contained'>logout</Button>
      </Grid>
      <Grid className='vacations-count' item xs={3}>
          <h3>Accepted</h3>
          <p>{vacs.filter(vac=> vac.status === 'accepted').length}</p>
      </Grid>
      <Grid item xs={3}>
        <h3>Pending</h3>
        <p>{vacs.filter(vac=> vac.status === 'pending').length}</p>

      </Grid>
      <Grid item xs={3}>
        <h3>Rejected</h3>
        <p>{vacs.filter(vac=> vac.status === 'rejected').length}</p>
      </Grid>
      <Grid item xs={12}>
        <div>
          <VacsTable
            rows={vacs}
            columns={[
              { field: 'id', headerName: 'ID', width: 70 },
              { field: 'title', headerName: 'Vacations Title', width: 130 },
              { field: 'status', headerName: 'Status', width: 130 },
              { field: 'employee', headerName: 'Employee', width: 130 },
            ]}
            length={vacs.length}
          />
        </div>
      </Grid>
    </Grid>
  )
}

export default User

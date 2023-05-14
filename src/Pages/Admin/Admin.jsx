import Grid from '@mui/material/Grid'
import React, { useContext, useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import VacsTable from '../../Components/VacsTable'
import { Button } from '@mui/material'
import { AuthContext } from '../../Utilities/AuthProvider'

ChartJS.register(ArcElement, Tooltip, Legend)
const Admin = () => {
    const [vacs, setVacs] = useState([])
    const [user, setUser] = useState([])
    const { setAuth} = useContext(AuthContext)

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/1')
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
      <Grid item xs={3}>
        <div className='Pie'>
          <Pie
            style={{
              height: '18rem',
            }}
            data={{
              labels: ['Rejected', 'Pending', 'Accepted'],
              datasets: [
                {
                  label: '# of Vacations',
                  data: [vacs.filter(vac=> vac.status === 'rejected').length, vacs.filter(vac=> vac.status === 'pending').length, vacs.filter(vac=> vac.status === 'accepted').length],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </Grid>
      <Grid item xs={3}>
        <div>Hi, M/ {user.name}</div>
        <Button onClick={()=> {
            localStorage.removeItem('user')
            setAuth(s => ({
              ...s,
              state:null,
              role: ''
            }))
            }} variant='contained'>logout</Button>
      </Grid>
      <Grid item xs={12}>
        <div>
          <VacsTable
            rows={vacs}
            columns={[
              { field: 'id', headerName: 'ID', width: 70 },
              { field: 'title', headerName: 'Vacations Title', width: 130 },
              { field: 'status', headerName: 'Status', width: 200 },
              { field: 'employee', headerName: 'Employee', width: 130 },
            ]}
            length={vacs.length}
          />
        </div>
      </Grid>
    </Grid>
  )
}

export default Admin

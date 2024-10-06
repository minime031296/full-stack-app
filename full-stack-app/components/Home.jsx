import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Logout from './Logout'


const Home = () => {
 
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
  const token = localStorage.getItem('token')
  const userInfo = localStorage.getItem('userInfo')

  console.log(token)
  console.log(userInfo)

  if(token && userInfo) {
   
      const parsedInfo = JSON.parse(userInfo)
      setGreeting(`Welcome ${parsedInfo.user.username}`)
    
  }
}, [])
  
  return (
    <>
    
    <Box sx={{ padding: 2, display:"flex", justifyContent:"center", alignItems:"center" }}>

        <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    width: "400px",
                    textAlign: "center",
                }}
            >
             {greeting ? 
                (<Box><Typography sx={{fontSize:{xs:"0.5em", sm:"0.5em", md:"0.8em", "lg":"1.2em"}, fontFamily:"sans-serif "}}>{greeting}</Typography><Logout/></Box>): (<Typography>Please log in.</Typography>)}
                
        </Paper>
       
    </Box>
    </>
  )
}

export default Home

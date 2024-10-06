import React, { useState } from 'react'
import AllRoutes from '../Routes/AllRoutes'
import Navbar from '../Routes/Navbar'
import { Box } from '@mui/material'


const App = () => {

  
  return (
    <Box >

      <Navbar/>
      <AllRoutes/>
      
    </Box>
  )
}

export default App

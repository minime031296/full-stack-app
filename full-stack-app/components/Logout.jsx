import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('uerInfo')

    navigate('/login')
  }
  return (
    <div>
      <Button variant='contained'
      sx={{marginBottom: 2, fontSize:{xs:"0.5em", sm:"0.5em", md:"0.8em", "lg":"1.2em" }}} 
      onClick={handleClick}>
        Logout
      </Button>
    </div>
  )
}

export default Logout

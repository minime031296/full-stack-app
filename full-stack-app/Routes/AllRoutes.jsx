import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../components/SignUp'
import Login from '../components/Login'
import Home from '../components/Home'
import Logout from '../components/Logout'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<Home/>} />
      <Route path='/logout' element={<Logout/>} />
    </Routes>
  )
}

export default AllRoutes

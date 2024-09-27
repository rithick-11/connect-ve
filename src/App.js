import React from 'react'
import { Route, Routes } from 'react-router-dom'

import {ConnectVe, Home, LoginAuth, Register, UserDetail} from "./Asserts/Pages/Pages"

import "./App.css"

const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/register' element={<Register/>}></Route>
      <Route exact path='/:username/login' element={<LoginAuth />}></Route>
      <Route exact path='/:username/auth' element={<UserDetail/>}></Route>
      <Route exact path='/:username' element={<ConnectVe />}></Route>    
    </Routes>
  )
}

export default App
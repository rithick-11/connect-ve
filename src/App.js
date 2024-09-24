import React from 'react'
import { Route, Routes } from 'react-router-dom'

import {Home, Register} from "./Asserts/Pages/Pages"

const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/register' element={<Register/>}></Route>
    </Routes>
  )
}

export default App
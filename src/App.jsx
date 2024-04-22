import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementAsync } from './features/users/usersSlice'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'

const App = () => {
  const {count, name, loading} = useSelector((state)=>state.users)
  const dispacth = useDispatch()

  const handleIncrement = ()=>{
    dispacth(incrementAsync())
  }

  const handleDecrement = ()=>{
    dispacth(decrement())
  }
  return (
    <div>
      {/* <h5>Nama saya adalah = {name}</h5>
      <p>nilai count saya adalah = {count}</p>
      {loading && <p>loading....</p>} 
      <button onClick={handleIncrement}>increment</button>
      
      <button onClick={handleDecrement}> Decrement</button> */}
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
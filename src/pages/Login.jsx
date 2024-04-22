import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/users/usersSlice'
import { useNavigate } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading} = useSelector((state)=>state.users)
  const [form, setForm] = useState({
    email: "", 
    password: ""
  })

  const handleSubmit = async(e)=>{
    try {
      e.preventDefault()
      const response = await dispatch(login(form))
      const result = unwrapResult(response)
      const user = result.data
      navigate('/home')
    } catch (error) {
      alert(error)
    }

    
    // dispatch(login(form))
    // .then((res)=>{
    //   const result = unwrapResult(res)
    //   console.log('result', result);
    //   navigate('/home')
    // })
    // .catch((err)=>{
    //   alert(err)
    // })

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <ul>
        <li>
        <input type="text" placeholder='' value={form.email} onChange={(e)=> setForm({...form, email: e.target.value})} />
        </li>
        <li>
        <input type="password" placeholder='' value={form.password} onChange={(e)=> setForm({...form, password: e.target.value})} />
        </li>
        
      </ul>
      <button>{loading ? "loading" : "login"}</button>
      </form>
    </div>
  )
}

export default Login
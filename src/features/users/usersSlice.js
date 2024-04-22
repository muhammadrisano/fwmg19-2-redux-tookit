import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const testAsync = ()=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve(true)
    }, 2000)
  })
}

export const incrementAsync = createAsyncThunk("users/increment", async(thunkAPI)=>{
 await testAsync()
 return 'benar'
})

export const login = createAsyncThunk("users/login", async(data, thunkAPI)=>{
  try {
    const result = await axios.post('https://fwm17-be-peword.vercel.app/v1/auth/login', {
      email: data.email,
      password: data.password
    })
    return result.data
  } catch (error) {
    console.log(error.response.data.message);
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

const initialState = {
  name: 'risano',
  count: 0,
  loading: false,
  user: null,
  error: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers:{
    changeName: (state, action)=>{
      state.name = action.payload
    },
    increment: async (state)=>{
      await testAsync()
      state.count = state.count + 1
    },
    decrement: (state)=>{


      state.count = state.count - 1
    }
  },
  extraReducers(builder){
    builder.addCase(incrementAsync.pending, (state)=>{
      state.loading = true
    })
    builder.addCase(incrementAsync.fulfilled, (state)=>{
      state.loading = false
      state.count = state.count + 1
    })
    builder.addCase(incrementAsync.rejected, (state)=>{
      state.loading = false
    })

    builder.addCase(login.pending, (state)=>{
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, action)=>{
      console.log(action);
      const {data} = action.payload

      localStorage.setItem('token', data.token)
      localStorage.setItem('refreshToken', data.refreshToken)

      state.loading = false
      state.user = data
    })
    builder.addCase(login.rejected, (state, action)=>{

      state.loading = false
      state.error = action.payload
    })
  }
})

export const {changeName, increment, decrement} = usersSlice.actions

export default usersSlice.reducer
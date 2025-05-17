import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    fullName:"",
    email:"",
    phone:"",
    username:"",
}

export const AuthSlice = createSlice({
    name:"Auth",
    initialState,
    reducers:{

    }
})
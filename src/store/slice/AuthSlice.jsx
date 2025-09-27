import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    fullName:"",
    email:"",
    phone:"",
    username:"",
    role:"",
    isLogin:false
}

export const AuthSlice = createSlice({
    name:"Auth",
    initialState,
    reducers:{
        addData:(state,action)=>{
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.phone = action.payload.phone;
            state.username = action.payload.username;
            state.role = action.payload.role;
            state.isLogin = true;
        },
        removeData:(state)=>{
            console.log("this is only for testing")
            state.email = "";
            state.fullName = "";
            state.phone = "";
            state.username = "";
            state.role = "";
            state.isLogin = false;
        },
        setLoginState:(state)=>{
            state.isLogin = true;
        }
    }
})

export const {removeData,addData,setLoginState} = AuthSlice.actions;
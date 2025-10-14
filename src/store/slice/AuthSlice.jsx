import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    fullName:"",
    email:"",
    phone:"",
    username:"",
    role:"",
    _id:"", // Add user ID
    isLogin:false,
    isSubscribed:false,
    trialEndsAt:null
}

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setSelectedAdminId: (state, action) => {},
    addData: (state, action) => {
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.phone = action.payload.phone;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state._id = action.payload._id; // Add user ID
      state.isSubscribed = action.payload.isSubscribed || false;
      state.trialEndsAt = action.payload.trialEndsAt || null;
      state.isLogin = true;
    },
    removeData: (state) => {
      // console.log("this is only for testing");
      state.email = "";
      state.fullName = "";
      state.phone = "";
      state.username = "";
      state.role = "";
      state._id = "";
      state.isSubscribed = false;
      state.trialEndsAt = null;
      state.isLogin = false;
    },
    setLoginState: (state) => {
      state.isLogin = true;
    },
  },
});

export const {removeData,addData,setLoginState} = AuthSlice.actions;
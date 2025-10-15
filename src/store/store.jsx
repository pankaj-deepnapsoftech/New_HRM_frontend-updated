import { configureStore } from '@reduxjs/toolkit'
import { Api } from './api/api'
import { AuthSlice } from './slice/AuthSlice'
// AttendanceRegularization endpoints are injected into Api; no separate slice import needed

export const store = configureStore({
    reducer:{
        [Api.reducerPath]:Api.reducer,
        [AuthSlice.name]:AuthSlice.reducer,
        SuperAdminScope: (state = { selectedAdminId: null }, action) => {
            switch(action.type){
                case 'SuperAdminScope/setSelectedAdminId':
                    return { ...state, selectedAdminId: action.payload };
                default:
                    return state;
            }
        }
        
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(Api.middleware)
})
//api.jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const Api = createApi({
    reducerPath: 'Api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: import.meta.env.VITE_BACKEND_URL,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            // Get token from cookies if available
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('ajt='))
                ?.split('=')[1];
            
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
    }),
    tagTypes: ["Auth","Employee", "Project" , "User","Department", "LeaveRequest", "Gatepass"],

})

// Export the generated hooks
// export const {
// } = Api



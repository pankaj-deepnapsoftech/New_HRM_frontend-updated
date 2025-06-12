//api.jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const Api = createApi({
    reducerPath: 'Api',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL,credentials:"include" }),
    endpoints: () => ({}),
<<<<<<< HEAD
    tagTypes: ["Auth","Employee","Projects"],
=======
    tagTypes: ["Auth","Employee", "Project" , "User"],

})  

>>>>>>> 51c2af1f9991da0cf5edadbaab084a09ce302c7b


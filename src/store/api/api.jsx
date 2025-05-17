
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const Api = createApi({
    reducerPath: 'Api',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
    endpoints: () => ({}),
    credentials: 'include',
    tagTypes: ["Auth"],
})
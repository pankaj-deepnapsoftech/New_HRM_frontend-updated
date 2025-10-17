//api.jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const envOriginRaw = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '')
  .trim();
// Normalize: remove trailing slashes and any trailing /api or /api/v1 to avoid double prefix
const normalizedOrigin = envOriginRaw
  .replace(/\/+$/, '')
  .replace(/\/api(?:\/v1)?$/i, '');

const baseUrl = normalizedOrigin ? `${normalizedOrigin}/api/v1` : '/api/v1'

const rawBaseQuery = fetchBaseQuery({ 
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('ajt='))
            ?.split('=')[1];
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

// Wrapper to append adminId for SuperAdmin scoped views
const baseQueryWithAdminScope = async (args, api, extraOptions) => {
    const state = api.getState();
    const role = state?.Auth?.role;
    const selectedAdminId = state?.SuperAdminScope?.selectedAdminId;

    // Announcements are strictly per Admin; do not scope by SuperAdmin here
    return rawBaseQuery(args, api, extraOptions);
};

export const Api = createApi({
    reducerPath: 'Api',
    baseQuery: baseQueryWithAdminScope,
    endpoints: (builder) => ({
    }),
    tagTypes: ["Auth","Employee", "Project" , "User","Department","Departments", "LeaveRequest", "Gatepass", "Designation", "Announcements", "ResignationRequest"],
})

// Export the generated hooks
// export const {
// } = Api



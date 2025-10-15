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

    if (role === 'SuperAdmin' && selectedAdminId && typeof args === 'object') {
        // Only append to targeted endpoints
        const shouldScope = typeof args.url === 'string' && (
            args.url.startsWith('/empdata') ||
            args.url.startsWith('/gatepass') ||
            args.url.startsWith('/departments')
        );
        if (shouldScope) {
            const hasQuery = args.url.includes('?');
            const sep = hasQuery ? '&' : '?';
            args = { ...args, url: `${args.url}${sep}adminId=${selectedAdminId}` };
        }
    }
    return rawBaseQuery(args, api, extraOptions);
};

export const Api = createApi({
    reducerPath: 'Api',
    baseQuery: baseQueryWithAdminScope,
    endpoints: (builder) => ({
    }),
    tagTypes: ["Auth","Employee", "Project" , "User","Department", "LeaveRequest", "Gatepass"],
})

// Export the generated hooks
// export const {
// } = Api



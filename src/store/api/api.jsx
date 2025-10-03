//api.jsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
  tagTypes: [
    "Auth",
    "Employee",
    "Project",
    "User",
    "Department",
    "LeaveRequest",
  ],
});

// Export the generated hooks
// export const {
// } = Api

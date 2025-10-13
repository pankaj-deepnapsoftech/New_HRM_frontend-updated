import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8075/api/v1';

// Create axios instance with default config
const superAdminAPI = axios.create({
    baseURL: `${API_BASE_URL}/superadmin`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token if needed
superAdminAPI.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
superAdminAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// SuperAdmin API services
export const SuperAdminServices = {
    // Get super admin dashboard overview
    getDashboardData: async () => {
        try {
            const response = await superAdminAPI.get('/dashboard');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get all admins with statistics
    getAllAdmins: async () => {
        try {
            const response = await superAdminAPI.get('/admins');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get all employees with details and pagination
    getAllEmployees: async (params = {}) => {
        try {
            const response = await superAdminAPI.get('/employees', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Assign employees to admin (for future use)
    assignEmployeesToAdmin: async (data) => {
        try {
            const response = await superAdminAPI.post('/assign-employees', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default SuperAdminServices;

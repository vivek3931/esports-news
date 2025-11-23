import axios from 'axios';

// Use backend proxy instead of direct API calls
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Backend API Instance (no direct API keys needed)
export const backendApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Error handling interceptor
const handleApiError = (error) => {
    if (error.response) {
        console.error('API Error:', error.response.data);
        console.error('Status:', error.response.status);
    } else if (error.request) {
        console.error('No response received:', error.request);
    } else {
        console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
};

backendApi.interceptors.response.use((response) => response, handleApiError);

export default backendApi;
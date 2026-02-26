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

backendApi.interceptors.request.use((config) => {
    // Add Authorization header if token exists
    const userInfoData = localStorage.getItem('userInfo');
    if (userInfoData) {
        try {
            const parsed = JSON.parse(userInfoData);
            if (parsed && parsed.token) {
                config.headers.Authorization = `Bearer ${parsed.token}`;
            }
        } catch (e) {
            console.error('Error parsing token from localStorage', e);
        }
    }
    return config;
});

backendApi.interceptors.response.use((response) => {
    return response;
}, handleApiError);

export default backendApi;
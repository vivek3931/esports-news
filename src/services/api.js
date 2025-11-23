import axios from 'axios';

const PANDASCORE_BASE_URL = 'https://api.pandascore.co';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// PandaScore API Instance
export const pandaScoreApi = axios.create({
    baseURL: PANDASCORE_BASE_URL,
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_PANDASCORE_KEY}`,
    },
});

// News API Instance
export const newsApi = axios.create({
    baseURL: NEWS_API_BASE_URL,
    headers: {
        Accept: 'application/json',
    },
    params: {
        apiKey: import.meta.env.VITE_NEWS_API_KEY,
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

pandaScoreApi.interceptors.response.use((response) => response, handleApiError);
newsApi.interceptors.response.use((response) => response, handleApiError);

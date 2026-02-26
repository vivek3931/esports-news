import backendApi from './api.js'

// Simple In-Memory Cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getEsportsNews = async (params = {}) => {
    try {
        const cacheKey = 'getEsportsNews_' + JSON.stringify(params);
        if (cache.has(cacheKey) && Date.now() - cache.get(cacheKey).timestamp < CACHE_DURATION) {
            return cache.get(cacheKey).data;
        }

        const response = await backendApi.get('/api/news', {
            params: {
                q: 'esports OR gaming',
                language: 'en',
                sortBy: 'publishedAt',
                ...params,
            },
        });
        const data = response.data.articles || [];
        cache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
};

export const getTopHeadlines = async (params = {}) => {
    try {
        const cacheKey = 'getTopHeadlines_' + JSON.stringify(params);
        if (cache.has(cacheKey) && Date.now() - cache.get(cacheKey).timestamp < CACHE_DURATION) {
            return cache.get(cacheKey).data;
        }

        const response = await backendApi.get('/api/news', {
            params: {
                q: 'esports OR "competitive gaming"',
                language: 'en',
                sortBy: 'popularity',
                pageSize: 5,
                ...params,
            },
        });
        const data = response.data.articles || [];
        cache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
    } catch (error) {
        console.error('Error fetching headlines:', error);
        return [];
    }
};
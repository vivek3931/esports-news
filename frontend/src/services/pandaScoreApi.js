import backendApi from './api.js'

// Simple In-Memory Cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getLiveMatches = async (params = {}) => {
    try {
        const cacheKey = 'getLiveMatches_' + JSON.stringify(params);
        if (cache.has(cacheKey) && Date.now() - cache.get(cacheKey).timestamp < CACHE_DURATION) {
            return cache.get(cacheKey).data;
        }

        const response = await backendApi.get('/api/matches/running', {
            params: {
                sort: 'begin_at',
                ...params,
            },
        });
        const data = response.data;
        cache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
    } catch (error) {
        console.error('Error fetching live matches:', error);
        return [];
    }
};

export const getUpcomingMatches = async (params = {}) => {
    try {
        const cacheKey = 'getUpcomingMatches_' + JSON.stringify(params);
        if (cache.has(cacheKey) && Date.now() - cache.get(cacheKey).timestamp < CACHE_DURATION) {
            return cache.get(cacheKey).data;
        }

        const response = await backendApi.get('/api/matches/upcoming', {
            params: {
                sort: 'begin_at',
                ...params,
            },
        });
        const data = response.data;
        cache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
    } catch (error) {
        console.error('Error fetching upcoming matches:', error);
        return [];
    }
};

export const getTournaments = async (params = {}) => {
    try {
        const cacheKey = 'getTournaments_' + JSON.stringify(params);
        if (cache.has(cacheKey) && Date.now() - cache.get(cacheKey).timestamp < CACHE_DURATION) {
            return cache.get(cacheKey).data;
        }

        const response = await backendApi.get('/api/tournaments', {
            params: {
                sort: '-begin_at',
                ...params,
            },
        });
        const data = response.data;
        cache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
    } catch (error) {
        console.error('Error fetching tournaments:', error);
        return [];
    }
};
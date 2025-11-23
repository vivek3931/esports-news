import backendApi from './api.js'

export const getLiveMatches = async (params = {}) => {
    try {
        const response = await backendApi.get('/api/matches/running', {
            params: {
                sort: 'begin_at',
                ...params,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching live matches:', error);
        return [];
    }
};

export const getUpcomingMatches = async (params = {}) => {
    try {
        const response = await backendApi.get('/api/matches/upcoming', {
            params: {
                sort: 'begin_at',
                ...params,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching upcoming matches:', error);
        return [];
    }
};

export const getTournaments = async (params = {}) => {
    try {
        const response = await backendApi.get('/api/tournaments', {
            params: {
                sort: '-begin_at',
                ...params,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tournaments:', error);
        return [];
    }
};
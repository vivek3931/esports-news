import backendApi from './api.js'

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

export const getTeams = async (params = {}) => {
    try {
        const response = await backendApi.get('/api/teams', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching teams:', error);
        return [];
    }
};

export const getGames = async (params = {}) => {
    try {
        const response = await backendApi.get('/api/games', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
};
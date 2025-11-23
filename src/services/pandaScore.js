import { pandaScoreApi } from './api';

export const getTournaments = async (params = {}) => {
    try {
        const response = await pandaScoreApi.get('/tournaments', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching tournaments:', error);
        return [];
    }
};

export const getUpcomingMatches = async (params = {}) => {
    try {
        const response = await pandaScoreApi.get('/matches/upcoming', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching upcoming matches:', error);
        return [];
    }
};

export const getLiveMatches = async (params = {}) => {
    try {
        const response = await pandaScoreApi.get('/matches/running', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching live matches:', error);
        return [];
    }
};

export const getTeams = async (params = {}) => {
    try {
        const response = await pandaScoreApi.get('/teams', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching teams:', error);
        return [];
    }
};

export const getGames = async () => {
    try {
        const response = await pandaScoreApi.get('/videogames');
        return response.data;
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
};

import backendApi from './api.js'

export const getEsportsNews = async (params = {}) => {
    try {
        const response = await backendApi.get('/api/news', {
            params: {
                q: 'esports OR gaming',
                language: 'en',
                sortBy: 'publishedAt',
                ...params,
            },
        });
        return response.data.articles || [];
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
};

export const getTopHeadlines = async (params = {}) => {
    try {
        const response = await backendApi.get('/api/news', {
            params: {
                q: 'esports OR "competitive gaming"',
                language: 'en',
                sortBy: 'popularity',
                pageSize: 5,
                ...params,
            },
        });
        return response.data.articles || [];
    } catch (error) {
        console.error('Error fetching headlines:', error);
        return [];
    }
};
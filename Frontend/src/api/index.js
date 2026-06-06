import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const fetchComponents = async () => {
    const { data } = await api.get('/components');
    return data;
};

export const saveLearningPath = async (path) => {
    const { data } = await api.post('/learning-paths', path);
    return data;
};

export const loadLearningPaths = async (id) => {
    const { data } = await api.get(`/learning-paths/${id}`);
    return data;
};

export default api;

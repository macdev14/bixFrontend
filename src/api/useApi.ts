import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8000/api/"
});

export const useApi = () => ({

    setToken: async (token: string) => {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    },

    refreshToken: async (token: string) => {
        const response = await api.post('/refresh/', { access: token });
        return response.data;
    },
    
    signin: async (email: string, password: string) => {
        const response = await api.post('login/', { email, password });
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/logout');
        return response.data;
    },

    get: async (endpoint: string, token?: string) => {
        try {
            const headers: HeadersInit = {};
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const response = await api.get(endpoint, { headers });
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer solicitação GET:', error);
            throw error;
        }
    },
    
    post: async (endpoint: string, body: object, token: string) => {
        try {
            const response = await api.post(endpoint, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer solicitação POST:', error);
            throw error;
        }
    },

    put: async (endpoint: string, body: object, token: string) => {
        try {
            const response = await api.put(endpoint, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer solicitação PUT:', error);
            throw error;
        }
    },

    del: async (endpoint: string, token: string) => {
        try {
            const response = await api.delete(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer solicitação DELETE:', error);
            throw error;
        }
    }
});
import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8000/api/"
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('refresh/', { refresh: token });
        return response.data;
    },

    setToken: async (token: string) => {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    },

    signin: async (username: string, password: string) => {
        const response = await api.post('login/', { username, password });
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/logout');
        return response.data;
    },

    get: async (endpoint: string, token?: string) => {
        try {
            const headers: HeadersInit = {};
            if (token && token != null) {
                headers.Authorization = `Bearer ${token}`;
            }

            const response = await api.get(endpoint, { headers });
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer solicitação GET:', error);
            throw error;
        }
    },
    
    post: async (endpoint: string, body: object, token: string | undefined) => {
        try {
            const headers = {
                headers: {
                 Authorization: `Bearer ${token}`
                }
            }
            if (token && token != null) {
                const response = await api.post(endpoint, body, headers);
                return response.data;
            }
            else{
                const response = await api.post(endpoint, body);
                return response.data;
            }


            
        } catch (error) {
            console.error('Erro ao fazer solicitação POST:', error);
            throw error;
        }
    },

    put: async (endpoint: string, body: object, token: string) => {
        try {
            const headers = {
                headers: {
                 Authorization: `Bearer ${token}`
                }
            }
            if (token && token != null) {
                const response = await api.put(endpoint, body, headers);
                return response.data;
            }
            else{
                const response = await api.put(endpoint, body);
                return response.data;
            }
        } catch (error) {
            console.error('Erro ao fazer solicitação PUT:', error);
            throw error;
        }
    },

    del: async (endpoint: string, token: string) => {
        try {
            const headers = {
                headers: {
                 Authorization: `Bearer ${token}`
                }
            }

            if (token && token != null) {
                const response = await api.delete(endpoint, headers);
                return response.data;
            }
            else{
                const response = await api.delete(endpoint,);
                return response.data;
            }
        } catch (error) {
            console.error('Erro ao fazer solicitação DELETE:', error);
            throw error;
        }
    }
});

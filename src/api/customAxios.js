import axios from 'axios';

const axiosInstance = axios.create(
    {
        baseURL: process.env.REACT_APP_BACKEND
    }
);

const resfreshAxios = axios.create(
    {
        baseURL: process.env.REACT_APP_BACKEND
    }
);

resfreshAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('refresh_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                const response = await resfreshAxios.post('/api/v1/auth/refresh-token', { refreshToken });
                const token = response.data.access_token;
                const refreshTokenNew = response.data.refresh_token;

                localStorage.setItem('token', token);
                localStorage.setItem('refresh_token', refreshTokenNew);


                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            } catch (error) {
                // later :(
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

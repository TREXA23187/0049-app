import axios from 'axios';
import { BASE_URL } from '@/constants';
import { ls } from '@/utils/storage';

const instance = axios.create({
    baseURL: `http://${BASE_URL}:3000`,
    timeout: 30000
});

instance.interceptors.request.use(
    config => {
        config.headers.token = ls.get('user')?.token ?? '';

        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    response => {
        const code = response.data.code;

        // permission error
        if (code === 10001) {
            ls.get('user') && ls.remove('user');
            window.location.replace('/login');
            return;
        }
        return response.data;
    },
    err => {
        return Promise.reject(err);
    }
);

export function get(url, params) {
    return instance.get(url, {
        params
    });
}

export function post(url, data) {
    return instance.post(url, data);
}

export function put(url, data) {
    return instance.put(url, data);
}

export function del(url, params) {
    return instance.delete(url, {
        params
    });
}

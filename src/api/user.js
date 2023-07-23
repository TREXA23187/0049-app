import { get, post } from '@/utils/request';

export function login({ username, password }) {
    return post('api/v1/users/login', { user_name: username, password });
}

export function logout() {
    return post('api/v1/users/logout');
}

export function createUser(data) {
    return post('api/v1/users/user', data);
}

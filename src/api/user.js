import { get, post } from '@/utils/request';

export function login({ username, password }) {
    return post('api/v1/users/login', { user_name: username, password });
}

export function logout() {
    return post('api/v1/users/logout');
}

export function getUserList() {
    return get('api/v1/users/list');
}

export function createUser(data) {
    return post('api/v1/users/user', data);
}

export function getPermissionList() {
    return get('api/v1/users/perm/list');
}

export function changeUserInfo(data) {
    return post('api/users/patch/info', data);
}

export function deleteUser(id) {
    return post('api/users/delete', { id });
}

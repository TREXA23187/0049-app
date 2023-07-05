import { get, post } from '@/utils/request';

export function createInstance(data) {
    return post('api/v1/console/instance', data);
}

export function getInstanceList() {
    return get('api/v1/console/instance/list');
}

export function getInstanceInfo() {
    return get('api/v1/console/instance/info');
}

export function operateInstance(data) {
    return post('api/v1/console/instance/operate', data);
}

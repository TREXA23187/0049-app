import { get, post } from '@/utils/request';

export function createInstance(data) {
    return post('api/v1/console/instance', data);
}

export function getInstanceList(data) {
    return get('api/v1/console/instance/list');
}

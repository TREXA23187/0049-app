import { get, post, del } from '@/utils/request';

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

export function removeInstance(params) {
    return del('api/v1/console/instance', params);
}

export function createTemplate(data) {
    return post('api/v1/console/template', data);
}

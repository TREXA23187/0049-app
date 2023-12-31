import { get, post, del, put } from '@/utils/request';

export function createInstance(data) {
    return post('api/v1/console/instance', data);
}
export function getInstanceList() {
    return get('api/v1/console/instance/list');
}
export function getInstanceInfo(params) {
    return get('api/v1/console/instance/info', params);
}
export function getInstanceLogs(params) {
    return get('api/v1/console/instance/logs', params);
}
export function operateInstance(data) {
    return post('api/v1/console/instance/operate', data);
}
export function removeInstance(params) {
    return del('api/v1/console/instance', params);
}
export function createInstanceLink(data) {
    return post('api/v1/console/instance/link', data);
}
export function getInstanceLinkInfo(data) {
    return post('api/v1/console/instance/link/info', data);
}

export function createTemplate(data) {
    return post('api/v1/console/template', data);
}
export function getTemplateList() {
    return get('api/v1/console/template/list');
}
export function removeTemplate(params) {
    return del('api/v1/console/template', params);
}
export function getTemplateInfo(params) {
    return get('api/v1/console/template/info', params);
}
export function updateTemplate(data) {
    return put('api/v1/console/template', data);
}

export function createModel(data) {
    return post('api/v1/console/model', data);
}
export function getModelList() {
    return get('api/v1/console/model/list');
}
export function removeModel(params) {
    return del('api/v1/console/model', params);
}

export function createTask(data) {
    return post('api/v1/console/task', data);
}
export function getTaskList() {
    return get('api/v1/console/task/list');
}
export function operateTask(data) {
    return post('api/v1/console/task/operate', data);
}
export function removeTask(params) {
    return del('api/v1/console/task', params);
}

export function createImage(data) {
    return post('api/v1/console/image', data);
}
export function getImageList() {
    return get('api/v1/console/image/list');
}
export function getImageInfo(params) {
    return get('api/v1/console/image/info', params);
}
export function removeImage(params) {
    return del('api/v1/console/image', params);
}

export function sendInterfaceData(data) {
    return post('api/v1/console/interface', data);
}

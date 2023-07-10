import { get, post, del } from '@/utils/request';

export function downloadFile(params) {
    return get('api/v1/file/download', params);
}

export function getFileInfo(params) {
    return get('api/v1/file/info', params);
}

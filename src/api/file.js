import { get, post, del } from '@/utils/request';

export function downloadFile(params) {
    return get('api/v1/file/download', params);
}

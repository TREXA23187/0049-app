import { ls } from '@/utils/storage';

export function getNavigatorLanguage() {
    const lang = navigator.language ?? '';
    return lang.split('-')[0];
}

export function getLocale() {
    const navigatorLanguage = getNavigatorLanguage();
    if (ls.get('lang', '')) {
        return ls.get('lang', '');
    } else {
        return navigatorLanguage;
    }
}

export function changeLocale(language) {
    console.log(language);
    ls.set('lang', language);
    window.location.reload();
}

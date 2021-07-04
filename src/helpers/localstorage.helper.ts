import localstorage from '../constants/localstorage.constants'

const {accessToken, refreshToken} = localstorage;

export const setTokens = (access_token: string, refresh_token: string): void => {
    localStorage.setItem(accessToken, access_token);
    localStorage.setItem(refreshToken, refresh_token);
};

export const getTokens = (): string[] => {
    const access_token = localStorage.getItem(accessToken) || '';
    const refresh_token = localStorage.getItem(refreshToken) || '';

    return [access_token, refresh_token]
};

export const cleanStorage = (): void => {
    localStorage.clear();
};

export const getItem = (key: string): unknown | null => {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : null
};

export const updateLSValue = (key: string, newValue: string): void => {
    localStorage.setItem(key, newValue);
};


import { store } from "app/store/AppStore";

const BASE_URL = 'https://reqres.in/api';

export const END_POINT = {
    LOGIN: '/login',
    REGISTER: '/register',
    USER: '/users',
    TEAM_USERS: '/users',
} as const

export type TEndPoint = (typeof END_POINT)[keyof typeof END_POINT];

function getToken() {
    const token = store.getState().session.userToken;
    return token
}

async function getRequest(endPoint: string, method: 'GET' | 'POST' | 'PUT', body?: {}) {
    const token = getToken();

    const response = await fetch(`${BASE_URL}${endPoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        if (response.status === 404) throw new Error('404, Not found');
        if (response.status === 500) throw new Error('500, internal server error');
        throw new Error(response.status.toString());
    }
}

export const GET = async (endPoint: string, body?: {}) => {
    return getRequest(endPoint, 'GET', body);
}

export const POST = async (endPoint: string, body?: {}) => {
    return getRequest(endPoint, 'POST', body);
}








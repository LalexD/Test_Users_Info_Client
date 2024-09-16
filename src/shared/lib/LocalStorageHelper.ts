type TLocalStorageName = 'likes' | 'token'

interface ILikes {
    [id: string]: boolean
}

function getStorageByName(name: TLocalStorageName) {
    const data = localStorage.getItem(name);
    if (data) {
        return JSON.parse(data);
    } else {
        return null
    }
}

function setStorage(name: TLocalStorageName, value: {}) {
    localStorage.setItem(name, JSON.stringify(value))
}

function removeStorage(name: TLocalStorageName) {
    localStorage.removeItem(name)
}

export const getLikes = (): ILikes => {
    const likes = getStorageByName('likes');
    return likes ? likes : {};
}

export const saveLikes = (likes: ILikes) => {
    setStorage("likes", likes)
}

export const setLike = (idUser: number, isLike: boolean) => {
    const likes = getLikes();
    likes[idUser] = isLike;
    saveLikes(likes);
}

export const toogleLike = (idUser: string): boolean => {
    const likes = getLikes();
    let res = false;

    if (likes[idUser]) {
        delete likes[idUser];
        res = false;
    } else {
        likes[idUser] = true;
        res = true;
    }
    saveLikes(likes);

    return res
}

export const getToken = () => {
    return getStorageByName('token');
}

export const setToken = (token: string) => {
    setStorage('token', token);
}

export const removeToken = () => {
    removeStorage('token')
}
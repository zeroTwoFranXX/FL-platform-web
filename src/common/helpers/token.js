export const getToken = (name) => {
    return `${localStorage.getItem(name)}`
}

export const setToken = (name, value) => {
    localStorage.setItem(name, value)
}

export const clearToken = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}

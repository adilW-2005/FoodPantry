import axiosInstance from "../../api/axiosInstance";

export const register = async ({email, name, password, role}) => {
    const response = await axiosInstance.post('/auth/register', {
        email,
        name,
        password,
        role
    })

    return response.data;
}

export const login = async ({email, password}) => {
    const response = await axiosInstance.post('/auth/login', {
        email,
        password
    })

    return response.data;
}
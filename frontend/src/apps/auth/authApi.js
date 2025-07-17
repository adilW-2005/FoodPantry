import axiosInstance from "../../api/axiosInstance";

export const register = async ({email, name, password, role}) => {
    
    try {
        const response = await axiosInstance.post('/auth/register', {
            email,
            name,
            password,
            role
        });

        const { access, refresh } = response.data;

        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const login = async ({email, password}) => {

    try{
        const response = await axiosInstance.post('/auth/login', {
            email,
            password
        })

        const { access, refresh } = response.data;

        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);

        return response.data;
    } catch (error) {
        throw error;
    }
}
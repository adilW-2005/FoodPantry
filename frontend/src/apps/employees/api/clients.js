import axiosInstance from '../../../api/axiosInstance';

export const viewAllClients = async () => {
    try{
        const response = await axiosInstance.get('/employee/view_all_clients')
        return response.data
    } catch (error) {
        throw error
    }
}

export const viewClient = async (id) => {
    try{
        const response = await axiosInstance.get(`/employee/view_client/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const viewUnqualifiedClients = async () => {
    try{
        const response = await axiosInstance.get('/employee/view_unqualified_clients')
        return response.data
    } catch (error) {
        throw error
    }
}   


export const qualifyClient = async (id) => {
    try{
        const response = await axiosInstance.post(`/employee/qualify/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const fetchClients = async () => {
    try{
        const response = await axiosInstance.get('/employee/view_all_clients')
        return response.data
    } catch (error) {
        throw error
    }
}
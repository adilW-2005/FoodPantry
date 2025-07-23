import axiosInstance from '../../../api/axiosInstance';

export const viewAllVisits = async () => {
    try{
        const response = await axiosInstance.get('/visits/view_all_visits')
        return response.data
    } catch (error) {
        throw error
    }
}

export const viewVisit = async (id) => {
    try{
        const response = await axiosInstance.get(`/visits/view_visit/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const editVisit = async (id, data) => {
    try{
        const response = await axiosInstance.post(`/visits/edit_visit/${id}`, data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const fetchVisits = async () => {
    const data = await viewAllVisits();
    return data;
}
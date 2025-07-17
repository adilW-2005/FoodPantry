import axiosInstance from '../../../api/axiosInstance';

export const startVisit = async (startVisitData) => {
    try{
        const response = await axiosInstance.post('/visit/start-visit', startVisitData)
        return response.data
    } catch (error) {
        throw error
    }
}

export const submitVisit = async (visitData) => {
    try{
        const response = await axiosInstance.post('/visit/submit-visit', visitData)
        return response.data
    } catch (error) {
        throw error
    }
}

export const editVisit = async (editVisitData) => {
    try{
        const response = await axiosInstance.post('/visit/edit-visit', editVisitData)
        return response.data
    } catch (error) {
        throw error
    }
}   

export const viewVisitHistory = async () => {
    try{
        const response = await axiosInstance.get('/visit/view-visit-history')
        return response.data
    } catch (error) {
        throw error
    }
}   

export const viewMyVisit = async (id) => {
    try{
        const response = await axiosInstance.get(`/visit/view-my-visit/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}  
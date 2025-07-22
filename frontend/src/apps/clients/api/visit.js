import axiosInstance from '../../../api/axiosInstance';

export const startVisit = async (startVisitData) => {
    try{
        const response = await axiosInstance.post('/visits/start_visit', startVisitData)
        return response.data
    } catch (error) {
        throw error
    }
}

export const submitVisit = async (visitData) => {
    try{
        const response = await axiosInstance.post('/visits/submit_visit', visitData)
        return response.data
    } catch (error) {
        throw error
    }
}

export const editVisit = async (editVisitData) => {
    try{
        const response = await axiosInstance.post('/visits/edit_visit', editVisitData)
        return response.data
    } catch (error) {
        throw error
    }
}   

export const viewVisitHistory = async () => {
    try{
        const response = await axiosInstance.get('/visits/view_my_visit_history')
        return response.data
    } catch (error) {
        throw error
    }
}   

export const viewMyVisit = async (id) => {
    try{
        const response = await axiosInstance.get(`/visits/view_my_visit/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}  
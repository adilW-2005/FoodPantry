import axiosInstance from '../../../api/axiosInstance';

export const viewItems = async () => {
    try{
        const response = await axiosInstance.get('/visits/view_inventory')
        return response.data
    } catch (error) {
        throw error
    }
}

export const viewItem = async (id, item_type) => { 
    try{
        const response = await axiosInstance.get(`/inventory/view-item/${id}?item_type=${item_type}`)
        return response.data
    } catch (error) {
        throw error
    }
}
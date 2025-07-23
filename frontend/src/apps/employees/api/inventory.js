import axiosInstance from '../../../api/axiosInstance';

export const viewAllItems = async () => {
    try{
        const response = await axiosInstance.get('/inventory/view-items')
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

export const addItem = async (id, data) => {
    try{
        const response = await axiosInstance.post(`/inventory/add-item/${id}`, data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const createItem = async (data) => {
    try{
        const response = await axiosInstance.post('/inventory/create-item', data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const decreaseItemQuantity = async (id, data) => {
    try{
            const response = await axiosInstance.post(`/inventory/decrease-item-quantity/${id}`, data)
        return response.data
        } catch (error) {
        throw error
    }
}

export const deleteItem = async (id, item_type) => {
    try{
        const response = await axiosInstance.post(`/inventory/delete-item/${id}`, {item_type})
        return response.data
        } catch (error) {
        throw error
    }
}

export const editBatch = async (id, data) => {
    try{
        const response = await axiosInstance.post(`/inventory/edit-batch/${id}`, data)
        return response.data
        } catch (error) {
        throw error
    }
}

export const fetchItems = async () => {
    const data = await viewAllItems();
    
    // For grocery items, flatten to individual batches
    const groceryBatches = [];
    data.grocery_items.forEach(item => {
      if (item.batches && item.batches.length > 0) {
        item.batches.forEach(batch => {
          groceryBatches.push({
            id: batch.id,
            name: item.name,
            total_quantity: batch.quantity,
            category: item.category,
            unit: item.unit,
            type: 'grocery',
            batch_id: batch.id,
            item_id: item.id,
            expiration_date: batch.expiration_date,
            days_until_expiration: batch.days_until_expiration,
            is_active: batch.is_active
          });
        });
      }
    });
    
    const allItems = [
      ...groceryBatches,
      ...data.home_items.map(item => ({ ...item, type: 'home' })),
    ];
    return allItems;

};
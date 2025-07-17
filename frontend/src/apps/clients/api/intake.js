import axiosInstance from '../../../api/axiosInstance';

export const intakeClient = async (clientData) => {
    try {
        const response = await axiosInstance.post('/client/intake', clientData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
        return response.data;
    } catch (error) {
        throw error;
    }
};
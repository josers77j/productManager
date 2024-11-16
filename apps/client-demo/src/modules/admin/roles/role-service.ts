import axios from "axios";


    const  getRoles= async (page: number = 1, perPage: number = 10, searchTerm: string = '') =>{
        const API_URL = import.meta.env.VITE_API_URL;

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Hubo un error con la autenticación.');
            }
            const response = await axios.get(`${API_URL}/role`, {
                params: {
                    page,
                    perPage,
                    'filters[filter]': searchTerm   
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }catch (error) {
            console.error('Error fetching roles:', error);
            throw error;
        }
    };
    

    export default getRoles;
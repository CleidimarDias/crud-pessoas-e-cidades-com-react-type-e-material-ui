import { AxiosError } from "axios"

export const errorInterseptor = (error: AxiosError)=>{
    
    if(error.message === 'Network Error'){
        return Promise.reject(new Error('Erro de Conexão'));
    };

    if(error.response?.status === 401) {
        //Do Something
    };

    return Promise.reject(error);
};
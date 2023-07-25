import axios from 'axios';
import { errorInterseptor, responseInterseptor } from './interseptors';

 const Api = axios.create({
    baseURL: 'http://localhost:3333'
});



Api.interceptors.response.use(
    (response) => responseInterseptor(response),
    (error) => errorInterseptor(error)
)

export {Api};
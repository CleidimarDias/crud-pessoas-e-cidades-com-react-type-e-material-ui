import axios from 'axios';
import { errorInterseptor, responseInterseptor } from './interseptors';
import { Environment } from '../../../environment';

 const Api = axios.create({
    baseURL: Environment.URL_BASE
});



Api.interceptors.response.use(
    (response) => responseInterseptor(response),
    (error) => errorInterseptor(error)
)

export {Api};
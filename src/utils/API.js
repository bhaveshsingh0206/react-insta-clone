import axios from 'axios';
import { DATABASE_URL, AUTH_URL } from './Constants';

const DATABASE = axios.create({
    baseURL: DATABASE_URL,
 });

 const AUTH = axios.create({
    baseURL: AUTH_URL,
 });

 export {DATABASE, AUTH};
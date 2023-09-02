import axios from "./axios";


export const getAllRecords = () => axios.get( '/recordatorios');
export const getRecord = (id) => axios.get( `/recordatorio/${id}`);
export const createRecord = (data) => axios.post( '/recordatorio',data);
export const modifyRecord = (data) => axios.put( `/recordatorio/${data._id}`, data);
export const deleteRecord = (id) => axios.delete(`/recordatorio/${id}`);

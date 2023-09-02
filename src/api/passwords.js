import axios from "./axios";


export const getAllObjects = () => axios.get( '/gestion');
export const getObject = (id) => axios.get( `/gestion/${id}`);
export const createObject = (data) => axios.post( '/gestion',data);
export const modifyObject = (data) => axios.put( `/gestion/${data._id}`, data);
export const deleteObject = (id) => axios.delete(`/gestion/${id}`);

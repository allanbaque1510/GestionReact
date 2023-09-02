import axios from "axios";
const instancia = axios.create({
    baseURL:'https://gestionbackend-api.up.railway.app/api',
    withCredentials:true
})
export default instancia

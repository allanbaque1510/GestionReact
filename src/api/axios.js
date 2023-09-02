import axios from "axios";
const instancia = axios.create({
    baseURL:'https://gestionbackend-api.up.railway.app/',
    withCredentials:true
})
export default instancia
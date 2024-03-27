import axios from "axios"


const api = axios.create({
    baseURL: 'http://192.168.237.74:8000/api',
    timeout:9000,
    withCredentials:true

})

export default api
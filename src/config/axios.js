import axios from "axios";

const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',               // acepta respuestas de tipo json desde la api
        'X-Requested-With': 'XMLHttpRequest'        // laravel detecta si la petición fue hecha por javascript para permitir el uso de cookies de sesion de peticiones CORS
    },
    withCredentials: true,                   // incluye las cookies de sesión en la peticion (como XSRF-token y laravel-sesssion)
    withXSRFToken: true,
});

export default clienteAxios;
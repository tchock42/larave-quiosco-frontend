import useSWR from "swr";
import clienteAxios from "../config/axios"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = ({middleware, url}) => {

    // al llamar al hook se ejecuta SWR para validar y despues la función extraída del hook
    const token = localStorage.getItem('AUTH_TOKEN')    // toma el token para enviarlo al endpoint de autenticación
    const navigate = useNavigate();

    //obtener el usuario actual con SWR
    const { data: user, error, mutate } = useSWR('/api/user', () =>  // estár retornando user y error, asigna user a data, sin llaves para que lo llame en automático
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)  // consulta realizada, retorna la respuesta
        .catch(error => {       
            throw Error(error?.response?.data?.errors) // consulta fallida, retorna el error
        })
    )
    

    // consulta para hacer login
    const login = async (datos, setErrores) =>{
        try {
            const {data} = await clienteAxios.post('/api/login', datos);
            localStorage.setItem('AUTH_TOKEN', data.token); // guarda en localstorage el token
            setErrores([])  // reinicia los errores
            await mutate()        // forzar revalidación
        } catch (error) {
            // console.log(error)
            setErrores(Object.values(error.response.data.errors))
        }
    }

    // consulta para registrar un usuario
    const registro = async (datos, setErrores) =>{
        try {
            const {data} = await clienteAxios.post('/api/registro', datos)   // se envía a la api
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([]);
            await mutate(); // forzar revalidación
            console.log(data.token)
        } catch (error) {
            console.log(error.response.data.errors)
            setErrores(Object.values(error.response.data.errors).flat())
        }
    }

    // consulta para cerrar sesión
    const logout = async () =>{
        try {
            // en el backend elimina el token actual y retorna user como null
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')   // elimina el token de LS
            await mutate(undefined)     // forza a SWR a invalidar y resetear el cache de /api/user, undefined borra el usuario local sin hacer fetch
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }
    
    // redireccionar al usuario segun su status 
    useEffect( () => {      
        if(middleware === 'guest' && url && user){
            navigate(url);
        }
        if(middleware === 'guest' && user && user.admin){   // guest porque en /login sigue sin ser admin
            navigate('/admin')
        }
        if(middleware === 'admin' && user && !user.admin){
            navigate('/')
        }
        if(middleware === 'auth' && error){
            navigate('/auth/login');
        }
        
    }, [user, error]);  // si cambia user o error, evalua si redirige
    // console.log(user)
    return {    // hace disponibles a login, registro, logout
        login,
        registro,
        logout, 
        user,
        error
    }
}

export default useAuth;
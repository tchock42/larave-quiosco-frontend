import { createRef, useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const Login = () => {

    const emailRef = createRef();   // referencias al input
    const passwordRef = createRef();

    const [errores, setErrores] = useState([]);

    // busca al user en cuanto se monta el Componente
    const {login} = useAuth({                   // extrae la funcion del hook y busca el usuer con SWR
        middleware: 'guest',                    // define el tipo de usuario
        url: '/'                                // define la ruta para redirigir
    });

    // cuando se da clic en iniciar sesion
    const handleSubmit = async (e) => {
        e.preventDefault()

        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        login(datos, setErrores)
    }
    

    return (
        <>
            <h1 className='text-4xl font-black'>Iniciar Sesión</h1>
            <p>Para crear un pedido debes iniciar sesión</p>

            <div className='bg-white shadow-md rounded-md mt-10 px-5 py-10'>
                <form 
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {errores ? errores.map(error => <Alerta key={error}>{error}</Alerta>) : null}
                    <div className='mb-4'>
                        <label 
                            htmlFor="email"
                            className='text-slate-800'
                        >Correo Electrónico:</label>
                        <input 
                            type="email" 
                            id='email' 
                            className="mt-2 w-full p-3 bg-gray-50 border border-slate-200 rounded-full transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            name="email"
                            placeholder="Tu Correo"
                            ref={emailRef}
                        />
                    </div>
                    <div className='mb-4'>
                        <label 
                            htmlFor="password"
                            className='text-slate-800'
                        >Contraseña:</label>
                        <input 
                            type="password" 
                            id='password' 
                            className="mt-2 w-full p-3 bg-gray-50 border border-slate-200 rounded-full transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            name="password"
                            placeholder="Tu Contraseña"
                            ref={passwordRef}
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Iniciar Sesión"
                        className="bg-indigo-600 transition duration-200 ease hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded-lg cursor-pointer"    
                    />
                </form>
            </div>
            <nav className="mt-5">
                <Link to="/auth/registro">¿No tienes cuenta? Crea una</Link>
            </nav>
        </>
    )
}

export default Login

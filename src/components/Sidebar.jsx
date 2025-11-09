import Categoria from './Categoria'
import useQuiosco from '../hooks/useQuiosco'
import useAuth from '../hooks/useAuth';

const Sidebar = () => {

    const {categorias} = useQuiosco();
    const {logout, user} = useAuth({midleware: 'auth'});

    return (
    
        <aside className="md:w-72"> {/** 288 px*/}       
            <div className="p-4">
                <img src="/img/logo.svg" alt="imagen logo" className="w-40"/>
            </div>
            <p className='my-10 p-2 text-xl text-center'>Hola {user?.name}</p>
            <div className='mt-10'>
                {categorias.map(categoria => (
                    <Categoria 
                        categoria={categoria}
                        key={categoria.id}
                    />
                ))}
            </div>
            <div className='my-5 px-5'>
                <button 
                    type='button'
                    className='text-center bg-red-500 w-full p-3 font-bold text-white truncate rounded-lg transition duration-200 hover:bg-red-600 cursor-pointer'
                    onClick={logout}
                >
                    Cancelar Orden
                </button>
            </div>
        </aside>
    )
}

export default Sidebar

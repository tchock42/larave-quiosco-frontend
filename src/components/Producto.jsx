import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

const Producto = ({producto, botonAgregar = false, botonDisponible = false}) => {
    const {nombre, imagen, precio} = producto
    const {handleClickModal, handleSetProducto,handleClickProductoAgotado} = useQuiosco();
    
    return (
        <div className="border border-slate-200 p-3 shadow bg-white transition ease-in duration-200 hover:border-slate-400">
            <img 
                src={`/img/${imagen}.jpg`} 
                alt={`Imagen ${nombre}`}
                className="w-full transtion duration-200 hover:scale-104 cursor-pointer" 
            />        
            <div className="p-5 mt-1">
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>
            </div>
            {botonAgregar && (
                <button
                    onClick={() => {
                        handleClickModal()
                        handleSetProducto(producto) // se pasa el producto al handleSetProducto
                    }}
                    type="button"
                    className="bg-indigo-600 transition ease-in duration-200 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded-full shadow-md cursor-pointer"
                >
                    Agregar
                </button>
            )}
            {botonDisponible && (
                <button
                    onClick={() => handleClickProductoAgotado(producto.id)}
                    type="button"
                    className="bg-indigo-600 transition ease-in duration-200 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded-full shadow-md cursor-pointer"
                >
                    Producto Agotado
                </button>
            )}
            
        </div>
    )
}

export default Producto
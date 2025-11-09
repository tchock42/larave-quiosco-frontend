import { useState, useEffect } from "react";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco"

const ModalProducto = () => {

    const {producto, handleClickModal, handleAgregarPedido, pedido} = useQuiosco();
    const [cantidad, setCantidad] = useState(1);
    const [edicion, setEdicion] = useState(false);

    useEffect( () => {
        if(pedido.some( pedidoState => pedidoState.id === producto.id )){ // si el producto seleccionado ya se encuentra en pedido[]
            const productoEdicion = pedido.filter(pedidoState => pedidoState.id === producto.id)[0]    // extrae de pedido el producto que ya existe 
            setCantidad(productoEdicion.cantidad);  // muestra la cantidad que ya se tiene seleccionado
            setEdicion(true);
        }
    }, [pedido]);

    return (
        <div className='md:flex gap-10'>
            <div className='md:w-1/3'>
                <img 
                    src={`/img/${producto.imagen}.jpg`} 
                    alt={`Imagen de Producto ${producto.nombre}`} 
                />
            </div>
            <div className='md:w-2/3'> {/**div para el boton de cerrar */}
                <div className='flex justify-end'>
                    <button
                        onClick={handleClickModal}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h1 className="text-3xl font-bold mt-5">
                    {producto.nombre}
                </h1>
                <p className="mt-5 font-black text-5xl text-amber-500">
                    {formatearDinero(producto.precio)}
                </p>

                <div className="flex gap-4 mt-5">
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => {        // como callback porque setCantidad tiene argumento
                            if(cantidad <= 1) return
                            setCantidad(cantidad - 1)
                        }}   
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </button>
                    <p className="text-3xl">{cantidad}</p>
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => {        // como callback porque setCantidad tiene argumento
                            if(cantidad >= 5) return
                            setCantidad(cantidad + 1)
                        }}     
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg> 
                    </button>
                </div>

                <button
                    type="button"
                    className="bg-indigo-600 transition duration-300 ease-in-out cursor-pointer shadow-xl hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded-md"
                    onClick={() => {
                        handleAgregarPedido({...producto, cantidad})
                        handleClickModal()
                    }} // toma todas las propiedades de producto y la cantidad en un solo objeto
                >{edicion ? 'Guardar Cambios' : 'Añadir al pedido'}</button>
            </div>
        </div>
    )
}

export default ModalProducto

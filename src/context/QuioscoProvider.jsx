import { createContext, useState } from "react";
import {toast} from 'react-toastify'
import { useEffect } from "react";
import clienteAxios from "../config/axios";

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {           // toma un children para que inyecte el state global
    
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriactual] = useState({});
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({});   // producto seleccionado para mostrar el modal
    const [total, setTotal] = useState(0);
    const [pedido, setPedido] = useState([]);   // aqui se guardan los productos a pagar

    useEffect( () => {
        const nuevoTotal = pedido.reduce( (total, producto ) => total + (producto.precio*producto.cantidad), 0 )
        setTotal(nuevoTotal)
    }, [pedido])

    /** obtener las categorias desde la API de manera asincrona */
    const obtenerCategorias = async () => {
        try {
            const token = localStorage.getItem('AUTH_TOKEN');
            const {data} = await clienteAxios('/api/categorias', {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setCategorias(data.data);
            setCategoriactual(data.data[0])
        } catch (error) {
            console.log(error);
        }
    }
    useEffect( () => {      // 
        obtenerCategorias();
    }, []);

    const handleClickCategoria = (id) => {  // actualiza el menu de categorias
        const categoria = categorias.filter(categoria => categoria.id === id)[0]       // objeto
        setCategoriactual(categoria)            // actualiza categoriaActual
    }

    const handleClickModal = () => {
        setModal(!modal)        // revierte el valor de modal cada que se da click   
    }

    const handleSetProducto = (producto) => {   // se abre el modal y muestra el producto
        setProducto(producto);
    } 

    const handleAgregarPedido = ({categoria_id, ...producto}) => { // ...producto forma un objeto con todo exceptuando categoria_id 
        // solo se deja pasar nombre, precio, id y cantidad
        if(pedido.some(pedidoState => pedidoState.id === producto.id)){
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)  // ? retorna mofificado : retorna el de pedido[]
            setPedido(pedidoActualizado);
            toast.success('Pedido actualizado')
        }else{
            setPedido([...pedido, producto]);   // toma todo el contenido de pedido, le agrega producto y mete todo en un array
            toast.success('Agregado al pedido')
        }
        
    }

    const handleEditarCantidad = (id) => {  // editar el pedido desde Resumen
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]    // si el id del producto actual es igual al id del boton al que se dio clic
        setProducto(productoActualizar)             // actualiza el state de producto para mostrarlo en modal
        setModal(!modal)                            // muestra el modal
    }

    const handleEliminarProductoPedido = (id) => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id )
        setPedido(pedidoActualizado);
        toast.success('Producto Eliminado');
    }

    const handleSubmitNuevaOrden = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await clienteAxios.post('/api/pedidos', {
                total, 
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                })
            }, {   
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(data.message)
            setTimeout(() => {
                setPedido([]);
            }, 1000);
            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN');
                logout();
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    // marcar orden como completada
    const handleClickCompletarPedido = async id =>{
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    // marcar producto como agotado
    const handleClickProductoAgotado = async id =>{
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <QuioscoContext.Provider
            value={{                        // doble {{ porque primero indica js y el segundo objeto
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }}      
        >{children}</QuioscoContext.Provider>
    );
}

export {                        // export nombrado
    QuioscoProvider
}
export default QuioscoContext   // export por default
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco"
import useAuth from '../hooks/useAuth'
import ResumenProducto from "./ResumenProducto";


const Resumen = () => {

  const {pedido, total, handleSubmitNuevaOrden } = useQuiosco();
  const {logout} = useAuth({});
  const comprobarPedido = () => pedido.length === 0;    // comprueba si hay pedidos

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSubmitNuevaOrden(logout);
  }

  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">Mi Pedido</h1>
      <p className="text-lg mt-5">Aquí podrás ver el resumen y costo total de tu pedido</p>

      <div className="py-10">
        {pedido.length === 0 ? (
          <p>No hay elementos en tu pedido aún</p>
        ) : (
          pedido.map(producto => (
            <ResumenProducto
              producto = {producto}
              key = {producto.id}
            />
          ))
        )}
      </div>
      <p className="text-xl mt-10">Total: {' '}
        {formatearDinero(total)}
      </p>
      
      <form 
        className="w-full"
        onSubmit={handleSubmit}  
      >
        <div className="mt-5">
          <input 
            type="submit"
            value="Confirmar Pedido"
            className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 transition ease-in duration-200 hover:bg-indigo-800 cursor-pointer'}  text-white w-full mt-5 p-3 uppercase font-bold rounded-full shadow-xl `}
            disabled = {comprobarPedido()}
          />
        </div>
      </form>
    </aside>
  )
}

export default Resumen

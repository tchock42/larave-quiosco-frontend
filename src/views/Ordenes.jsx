import useSWR from "swr"
import clienteAxios from "../config/axios"
import Spinner from "../components/Spinner";
import { formatearDinero } from "../helpers";
import useQuiosco from '../hooks/useQuiosco'

const Ordenes = () => {

  const token = localStorage.getItem('AUTH_TOKEN')

  // consulta para traer los pedidos
  const fetcher = () => clienteAxios('/api/pedidos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const {data, error, isLoading} = useSWR('/api/pedidos', fetcher, {refreshInterval:1000})  // revalidación de la consulta

  // marcar orden como completa
  const {handleClickCompletarPedido} = useQuiosco()

  console.log(data);
  console.log(error)
  console.log(isLoading)

  if(isLoading) return <Spinner/>

  return (
    <div>
      <h1 className="text-4xl font-black">Ordenes</h1>
      <p className="text-2xl my-10">Administra las ordenes desde aquí</p>

      <div className="md:grid md:grid-cols-2 gap-5 rounded-md" >
        {data.data.data.map(pedido => (
          <div key={pedido.id} className="flex flex-col justify-between p-5 bg-white shadow space-y-2 border-b-indigo-600">
            <p className="text-xl font-bold text-slate-600">
              Contenido del Pedido:
            </p>
              {pedido.productos.map(producto => (
                <div 
                  key={producto.id} 
                  className="border-b border-b-slate-200 last-of-type:border-none py-4"
                >
                  <p className="text-sm">{producto.id}</p>
                  <p>{producto.nombre}</p>
                  <p>Cantidad: {' '}
                    <span className="font-bold">{producto.pivot.cantidad}</span>
                  </p>
                </div>
              ))}

              <div>
                <p className="text-lg font-bold text-slate-600">
                  Cliente: {' '}
                <span className="font-normal">{pedido.user.name}</span>
                </p>
                <p className="text-lg font-bold text-amber-500">
                  Total a pagar: {' '}
                  <span className="font-normal text-slate-600">{formatearDinero(pedido.total)}</span>
                </p>
              </div>
              

              <button 
                type="button" 
                className="shadow bg-indigo-600 transition ease-in-out duration-200 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer" 
                onClick={() => handleClickCompletarPedido(pedido.id)}
                >Finalizar Pedido</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ordenes

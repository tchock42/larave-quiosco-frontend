import Producto from "../components/Producto"
import useSWR from "swr";
import useQuiosco from "../hooks/useQuiosco"
import clienteAxios from "../config/axios";
import Spinner from "../components/Spinner";

const Inicio = () => {

  const {categoriaActual} = useQuiosco();
  const token = localStorage.getItem('AUTH_TOKEN')
  /**function fetcher de swr */
  const fetcher = () => clienteAxios('/api/productos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(data => data.data)    // retorna data.data
  const {data, error, isLoading} = useSWR('/api/productos', fetcher, {
    refreshInterval:1000
  });   // consulta SWR | elimina el js y consulta la API de laravel para traer los productos

  if(isLoading) return <Spinner/>

  if(error) return <p className="text-red-500">Oops, no se pudo cargar la información.</p>;

  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id)
  return (
    <>
      <h1 className="text-4xl font-black">{categoriaActual.nombre}</h1>
      <p className="text-2xl my-10">Elige y personaliza tu pedido a continuación</p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        {productos.map(producto => (
          <Producto
            key={producto.id}
            producto={producto}
            botonAgregar = {true}
          />
        ))}
        
      </div>
    </>  
  )
}

export default Inicio

import useQuiosco from "../hooks/useQuiosco";

const Categoria = ({categoria}) => {
    
    const {handleClickCategoria, categoriaActual} = useQuiosco();
    const {icono, id, nombre} = categoria;

    return (
        <div 
            className={`${categoriaActual.id === id ? "bg-amber-400" : 'bg-white'} flex items-center gap-4 border border-slate-200 w-full p-3 transition duration-200 hover:bg-amber-400 hover:border-slate-400 cursor-pointer`}
            onClick={() => handleClickCategoria(id)}
        >
            <img src={`/img/icono_${icono}.svg`} alt="Imagen icono" className="w-12" />
            <p className="text-lg font-bold cursor-pointer truncate">{nombre}</p>  {/**truncate oculta el contenido que sobrepase una linea y añade ... */}
        </div>
    )
}

export default Categoria

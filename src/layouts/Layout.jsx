import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Resumen from "../components/Resumen"
import useQuiosco from "../hooks/useQuiosco"
import Modal from 'react-modal'
import ModalProducto from "../components/ModalProducto"
import { ToastContainer } from 'react-toastify'
import useAuth from "../hooks/useAuth"
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement('#root');

const Layout = () => {   
    const {user, error} = useAuth({
        middleware: 'auth'
    });
    console.log(user)
    console.log(error)
    const {modal} = useQuiosco();

    return (
        <>
        
            {/**en desktop se pone lado a lado, en mobile de arriba hacia abajo*/}
            <div className="md:flex">   
                <Sidebar />
                <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3"> {/* ocupa toda la pantalla y añade scroll al main */}
                    <Outlet/>    
                </main>
                
                <Resumen/>
            </div>
        
            
            <Modal isOpen={modal} style={customStyles}>     {/**se abre dependiendo del estado modal */}
                    <p>Desde Modal</p>
                    <ModalProducto 
                    />
            </Modal>
            <ToastContainer/>
        </>
        
    )
}

export default Layout

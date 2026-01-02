# Proyecto FreshCoffe (React Quiosco)

Una interfaz frontend construida con React y Vite para un quiosco/tienda de pedidos en línea. Esta aplicación actúa como cliente para un backend (por ejemplo, Laravel) y proporciona vistas tanto para usuarios como para administradores.

**Características principales**
- Autenticación: registro e inicio de sesión.
- Interfaces separadas para Administrador y Usuario.
- Catálogo de productos organizados por categorías.
- Gestión de pedidos y vista de órdenes (Admin).
- Resumen de pedido / carrito y creación de órdenes.
- Modales para ver y editar detalles de producto.

**Tecnologías**
- React 19 + Vite
- React Router (navegación)
- Axios (comunicaciones HTTP)
- TailwindCSS (estilos, integrado via PostCSS)
- React Modal, React Toastify, SWR (fetch/cache)

Instalación y desarrollo
1. Clona el repositorio y entra en la carpeta del frontend:

	npm install

2. Arranca el servidor de desarrollo:

	npm run dev

3. Producción / build:

	npm run build

4. Previsualizar build:

	npm run preview

Nota: Ajusta la URL del API en `src/config/axios.js` para apuntar a tu backend (por ejemplo, Laravel).

Scripts disponibles (desde `package.json`)
- `npm run dev` — inicia Vite en modo desarrollo.
- `npm run build` — genera los archivos optimizados para producción.
- `npm run preview` — sirve la build localmente.
- `npm run lint` — ejecuta ESLint sobre el proyecto.

Estructura del proyecto (resumen)
- `src/`
  - `main.jsx` — entrada de la aplicación.
  - `router.jsx` — definición de rutas.
  - `App.css`, `index.css` — estilos globales.
  - `components/` — componentes reutilizables (Sidebar, ModalProducto, Producto, Spinner, etc.).
  - `layouts/` — layouts para Admin, Auth y la app principal.
  - `views/` — páginas/ rutas (Inicio, Login, Registro, Productos, Ordenes).
  - `context/` — `QuioscoProvider` (estado global con Context API).
  - `hooks/` — hooks personalizados como `useAuth`, `useQuiosco`.
  - `config/axios.js` — instancia de Axios y base URL.
  - `data/` — datos iniciales (categorías, productos para pruebas).
  - `helpers/` — utilidades.

Descripción de algunos elementos clave
- `QuioscoProvider.jsx`: Context provider principal que maneja el estado de la aplicación: categorías, producto activo, carrito/resumen y comportamiento de modales.
- `ModalProducto.jsx`: Modal para ver y editar cantidad/detalles de un producto antes de añadir al pedido.
- `Resumen.jsx` y `ResumenProducto.jsx`: Componentes que muestran el resumen del pedido y los artículos añadidos.
- `AdminLayout.jsx` / `AuthLayout.jsx`: Layouts que envuelven las páginas según rol/propósito.

Endpoints / Rutas visitables
Las rutas definidas en la aplicación se encuentran en `src/router.jsx`. A continuación se listan las rutas públicas y de administración que puedes visitar:

- `/` — Inicio (vista principal) — `Inicio` (index route del `Layout`).
- `/auth/login` — Login — `Login` (renderizado dentro de `AuthLayout`).
- `/auth/registro` — Registro — `Registro` (renderizado dentro de `AuthLayout`).
- `/admin` — Panel Admin (órdenes) — `Ordenes` (index route del `AdminLayout`).
- `/admin/productos` — Gestión de productos — `Productos` (renderizado dentro de `AdminLayout`).

Nota: Las rutas con layout usan un componente contenedor (`Layout`, `AuthLayout`, `AdminLayout`) y sus child routes se renderizan dentro de dicho layout. Para ver la definición exacta, revisa [src/router.jsx](src/router.jsx).

Contribuir
- Si quieres contribuir, abre un issue o envía un pull request con cambios claros y probados. Sigue las convenciones de ESLint incluidas.

Notas y recomendaciones
- Recomendado usar Node 18+ y npm 9+ o yarn 1/berry.
- Asegúrate de configurar el backend y la URL en `src/config/axios.js` para que las peticiones funcionen correctamente.
- Si vas a conectar con Laravel, habilita CORS en el backend para la URL del frontend.

Licencia
Este repositorio no incluye una licencia explícita. Añade una licencia si deseas permitir contribuciones externas.

---

Si quieres que incluya capturas de pantalla, instrucciones para desplegar en un host específico (Netlify, Vercel, Surge) o ejemplos de env vars, dime cuál prefieres y lo añado.
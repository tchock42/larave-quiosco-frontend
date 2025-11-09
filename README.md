# Proyecto FreshCoffe

## Technology Stack:

React (Frontend)
Vite as the build tool
Axios for HTTP requests
React Router for navigation

## Project Structure:

Uses a modern React architecture with contexts, hooks, and components
Organized into logical folders (components, layouts, views, context, hooks)

## Main Features:

- Authentication system (Login/Register views)
- Admin and User interfaces
- Product catalog organized by categories
- Order management system
- Shopping cart/order summary functionality

## Key Components:

- QuioscoProvider: Main context provider for state management
- AdminLayout and AuthLayout: Different layouts for admin and auth pages
- ModalProducto: Product detail modal component
- Sidebar: Navigation component
- Resumen: Order summary component

## Views:

- Inicio: Home/Main view
- Login & Registro: Authentication views
- Ordenes: Orders management
- Productos: Products management

## Data Management:

- Uses custom hooks (useAuth, useQuiosco) for state management
- Includes predefined data for categories and products
- Axios configuration for API communication
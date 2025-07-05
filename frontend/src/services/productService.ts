import { Product } from '../types/Product';
import { useAuth } from '../contexts/AuthContext';

const API_BASE = import.meta.env.VITE_API_BASE;

export const useProductService = () => {
    const { token, tenantId } = useAuth();

    const authHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': token || '',
    });

    const crearProducto = async (producto: Omit<Product, 'id' | 'tenant_id'>): Promise<any> => {
        if (!token || !tenantId) throw new Error('No autenticado');

        const response = await fetch(`${API_BASE}/producto/crear`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ tenant_id: tenantId, ...producto }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Error al crear el producto');
        return data;
    };

    const getProducts = async (filtros?: any): Promise<Product[]> => {
        if (!token || !tenantId) throw new Error('No autenticado');

        const response = await fetch(`${API_BASE}/producto/listar`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ tenant_id: tenantId, filtros }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Error al obtener productos');
        return data.productos || [];
    };

    const buscarProducto = async (nombre: string): Promise<Product[]> => {
        if (!token || !tenantId) throw new Error('No autenticado');

        const response = await fetch(`${API_BASE}/producto/buscar`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ tenant_id: tenantId, nombre }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Error al buscar producto');
        return data.resultado || [];
    };

    const modificarProducto = async (producto: Product): Promise<any> => {
        if (!token) throw new Error('No autenticado');

        const response = await fetch(`${API_BASE}/producto/modificar`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify({
                producto_id: producto.producto_id,
                producto_datos: {
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    precio: producto.precio,
                    categoria_id: producto.categoria_id,
                    stock: producto.stock
                }
            }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Error al modificar producto');
        return data;
    };

    const eliminarProducto = async (id: string): Promise<any> => {
        if (!token) throw new Error('No autenticado');

        const response = await fetch(`${API_BASE}/producto/eliminar`, {
            method: 'DELETE',
            headers: authHeaders(),
            body: JSON.stringify({ producto_id: id }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Error al eliminar producto');
        return data;
    };


    return {
        crearProducto,
        getProducts,
        buscarProducto,
        modificarProducto,
        eliminarProducto,
    };
};

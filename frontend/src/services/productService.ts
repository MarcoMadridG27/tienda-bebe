import { Product } from '../types/Product';
import { useAuth } from '../contexts/AuthContext';

import { API_BASE } from './api';
export interface ProductPayload {
  tenant_id: string;
  producto_id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  age: string;
  gender: string;
  type: string;
  availability: string;
  imageUrl: string;
}
export const useProductService = () => {
    const { token, tenantId } = useAuth();

    const authHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': token || '',
    });
    

    const crearProducto = async (payload: ProductPayload,token: string):
     Promise<{ message: string; producto_id: string }> => {
        const resp = await fetch(`${API_BASE}/producto/crear`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });
        if (!resp.ok) throw new Error(`Create product failed (${resp.status})`);
        return resp.json();
};

    const getProducts = async (): Promise<Product[]> => {
    if (!token || !tenantId) throw new Error('No autenticado')
    console.info(token)
    const resp = await fetch(`${API_BASE}/producto/listar`, {
      method: 'POST',
      headers: {
      
        Authorization:   `${token}`
      },
      body: JSON.stringify({ tenant_id: tenantId,limit :5}),
    })
  
    const data = await resp.json()
    const raw: any[] = data.productos || []

    return raw.map(item => ({
      producto_id:    item.producto_id,
      tenant_id:      item.tenant_id,
      nombre:         item.name        || item.nombre        || 'Sin nombre',
      descripcion:    item.description || item.descripcion || '',
      precio:         Number(item.price ?? item.precio ?? 0),
      categoria_id:   item.category_id || item.categoria_id || '',
      edad:           item.age         || item.edad         || '',
      genero:         item.gender      || item.genero      || '',
      tipo:           item.type        || item.tipo        || '',
      disponibilidad: item.availability|| item.disponibilidad|| 'Desconocido',
      imageUrl:       item.imageUrl    || '/placeholder.png',
    }))
  }

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
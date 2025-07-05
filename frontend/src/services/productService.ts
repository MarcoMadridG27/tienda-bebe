import { Product } from '../types/Product';

const API_BASE = 'https://nwt4qfsse9.execute-api.us-east-1.amazonaws.com/dev';

export const getProducts = async (): Promise<Product[]> => {
  // Arma la petición
  const res = await fetch(`${API_BASE}/producto/listar`, {
    method: 'POST', // según tu Lambda solo acepta POST
    headers: {
      'Content-Type': 'application/json',
      // Si tu API requiere autenticación, descomenta y ajusta:
      // 'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({}), // envía un cuerpo vacío para usar el limit por defecto
  });

  // Verifica errores HTTP
  if (!res.ok) {
    throw new Error(`Error al listar productos: ${res.status} ${res.statusText}`);
  }

  // Parsea la respuesta
  const payload = await res.json() as {
    productos: Product[];
    lastEvaluatedKey?: any;
  };

  // Devuelve el arreglo de productos
  return payload.productos;
};

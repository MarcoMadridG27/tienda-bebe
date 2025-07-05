import { CartItem } from "../contexts/CartContext";

const API_BASE = import.meta.env.VITE_API_BASE;

export const registrarCompra = async (productos: CartItem[]) => {
    const token = localStorage.getItem("token");
    const tenant_id = localStorage.getItem("tenant_id");

    const response = await fetch(`${API_BASE}/compra/registrar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token || '',
        },
        body: JSON.stringify({ tenant_id, productos }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al registrar la compra');
    return data;
};

export const listarCompras = async () => {
    const token = localStorage.getItem("token");
    const tenant_id = localStorage.getItem("tenant_id");

    const response = await fetch(`${API_BASE}/compra/listar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token || '',
        },
        body: JSON.stringify({ tenant_id }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al obtener compras');
    return data.compras || [];
};

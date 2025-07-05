export interface Product {
    producto_id: string;         // ID del producto (clave principal)
    tenant_id: string;           // ID del tenant (partición en la tabla)
    nombre: string;              // Nombre del producto
    descripcion?: string;        // Descripción opcional
    precio: number;              // Precio numérico
    categoria_id?: string;       // ID de categoría (clave foránea)
    stock?: number;              // Cantidad en stock (opcional)
    imageUrl?: string;           // Imagen opcional
    edad?: string;               // Edad sugerida
    genero?: string;             // Género sugerido
    tipo?: string;               // Tipo de producto
    disponibilidad?: string;     // Disponible / no disponible
}

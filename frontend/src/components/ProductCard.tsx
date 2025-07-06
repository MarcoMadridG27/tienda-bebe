// src/components/ProductCard.tsx
import React from 'react'
import type { Product } from '../types/Product'

interface Props { product: Product; onAddToCart: (p:Product)=>void }

const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
  const price = product.precio.toFixed(2)
  return (
    <div className="card bg-white shadow rounded overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.nombre}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{product.nombre}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.descripcion}</p>
        <p className="font-bold mb-2">${price}</p>
        <p className="text-xs mb-4">
          Disponibilidad: <span className="font-medium">{product.disponibilidad}</span>
        </p>
        <button
          onClick={() => onAddToCart(product)}
          className="btn btn-sm btn-primary w-full"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  )
}

export default ProductCard

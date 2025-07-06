import React from 'react'
import { useCart } from '../contexts/CartContext'
import type { Product } from '../types/Product'

const CartDrawer: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart()

  // Asegurarnos de que cartItems sea siempre un array
  const items: Product[] = Array.isArray(cartItems) ? cartItems : []

  // Total con reduce *seguro*
  const total = items.reduce((sum, p) => sum + (p.precio || 0), 0)

  return (
    <div className="w-80 bg-base-100 h-full p-4 shadow-xl flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Tu Carrito</h2>

      {items.length === 0 ? (
        <p className="text-gray-500 flex-1">
          No tienes productos en el carrito.
        </p>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4">
          {items.map((item: Product) => (
            <div
              key={item.producto_id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={item.imageUrl}
                  alt={item.nombre}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="ml-3">
                  <p className="font-medium">{item.nombre}</p>
                  <p className="text-sm text-gray-600">
                    ${Number(item.precio).toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                className="btn btn-sm btn-ghost text-red-500"
                onClick={() => removeFromCart(item.producto_id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Total y acciones */}
      {items.length > 0 && (
        <>
          <div className="mt-4 border-t pt-4 flex justify-between">
            <span className="font-semibold">Total:</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-primary w-full mt-4"
            onClick={clearCart}
          >
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  )
}

export default CartDrawer
